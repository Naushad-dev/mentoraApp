import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RootStackParamList } from '../../types';
import { validateEmail, validatePassword } from '../../utils/helpers';

type CreateNavProp = StackNavigationProp<RootStackParamList, 'CreateStudent'>;

const CreateStudentScreen: React.FC = () => {
  const navigation = useNavigation<CreateNavProp>();
  const { user } = useAuth();
  const { addStudent } = useData();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!surname.trim()) newErrors.surname = 'Surname is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters';
    if (!dob.trim()) newErrors.dob = 'Date of Birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    addStudent({
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim().toLowerCase(),
      dateOfBirth: dob.trim(),
      parentId: user?.userId ?? '1',
      mentorId: '3',
    });
    setLoading(false);
    Alert.alert('Success', 'Student created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScreenWrapper scrollable>
      <Header
        title="Add New Student"
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={styles.form}>
        <Input
          label="First Name *"
          value={name}
          onChangeText={setName}
          placeholder="Aryan"
          error={errors.name}
          onBlur={() => {
            if (!name.trim()) setErrors((e) => ({ ...e, name: 'Name is required' }));
          }}
        />
        <Input
          label="Surname *"
          value={surname}
          onChangeText={setSurname}
          placeholder="Sharma"
          error={errors.surname}
          onBlur={() => {
            if (!surname.trim()) setErrors((e) => ({ ...e, surname: 'Surname is required' }));
          }}
        />
        <Input
          label="Email *"
          value={email}
          onChangeText={setEmail}
          placeholder="student@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          onBlur={() => {
            if (email && !validateEmail(email))
              setErrors((e) => ({ ...e, email: 'Enter a valid email' }));
          }}
        />
        <Input
          label="Password *"
          value={password}
          onChangeText={setPassword}
          placeholder="Min 6 characters"
          secureTextEntry={!showPassword}
          error={errors.password}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          }
        />
        <Input
          label="Date of Birth * (DD/MM/YYYY)"
          value={dob}
          onChangeText={setDob}
          placeholder="15/08/2008"
          error={errors.dob}
        />
        <Button
          label="Create Student"
          onPress={handleSubmit}
          fullWidth
          loading={loading}
          size="lg"
          style={styles.btn}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: theme.spacing.xl,
  },
  btn: { marginTop: theme.spacing.md },
});

export default CreateStudentScreen;
