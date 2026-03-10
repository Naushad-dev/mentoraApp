import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../config/theme';

const ProfileScreen: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user.name.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.role}>{user.role.toUpperCase()}</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email</Text>
                    <Text style={styles.detailValue}>{user.email}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Role</Text>
                    <Text style={styles.detailValue}>{user.role}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    name: {
        fontSize: theme.fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    role: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.secondary,
        fontWeight: '600',
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
    },
    detailsContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        ...theme.shadow.small,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
    },
    detailLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.secondary,
    },
    detailValue: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: theme.colors.error || '#EF4444',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: theme.spacing.xl,
    },
    logoutText: {
        color: '#fff',
        fontSize: theme.fontSize.md,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
