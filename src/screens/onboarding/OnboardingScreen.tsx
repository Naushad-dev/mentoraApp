import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { onboardingSlides } from '../../config/dashboardConfig';
import { theme } from '../../config/theme';
import { OnboardingSlide } from '../../types';
import { storage } from '../../utils/storage';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    goToSlide(onboardingSlides.length - 1);
  };

  const handleGetStarted = async () => {
    await storage.setOnboardingDone();
    onComplete();
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor, width }]}>
      <Text style={styles.illustration}>{item.illustration}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsRow}>
      {onboardingSlides.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );

  const isLast = currentIndex === onboardingSlides.length - 1;

  return (
    <View style={styles.container}>
      {/* Skip button */}
      {!isLast ? (
        <TouchableOpacity style={styles.skip} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      ) : null}

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        style={styles.flatList}
      />

      {/* Bottom area */}
      <View style={styles.bottom}>
        {renderDots()}
        <TouchableOpacity
          style={styles.button}
          onPress={isLast ? handleGetStarted : handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>{isLast ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF2FF' },
  flatList: { flex: 1 },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 120,
  },
  illustration: {
    fontSize: 120,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 24,
  },
  skip: {
    position: 'absolute',
    top: 56,
    right: theme.spacing.lg,
    zIndex: 10,
  },
  skipText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 48,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: theme.borderRadius.full,
    width: '100%',
    alignItems: 'center',
    ...theme.shadow.medium,
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default OnboardingScreen;
