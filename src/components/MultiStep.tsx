import {darkTheme, SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import React, {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import Button from './ui/Button';

// Step Component Type
interface StepProps {
  title: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({children}) => {
  return <>{children}</>;
};

// MultiStep Component
interface MultiStepProps {
  children: ReactElement<StepProps>[];
  onComplete?: () => void;
  style?: any;
  nextButtonDisabled?: boolean;
  submitButton?: ReactNode;
}

const MultiStep: React.FC<MultiStepProps> = ({
  children,
  onComplete,
  style,
  nextButtonDisabled,
  submitButton,
}) => {
  const {theme} = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const progressWidth = useRef(new Animated.Value(0)).current;

  // Validate children
  const validSteps = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === Step,
  );

  useEffect(() => {
    // Animate progress bar when currentStep changes
    Animated.timing(progressWidth, {
      toValue: currentStep / (validSteps.length - 1),
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < validSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get current step
  const currentStepElement = validSteps[currentStep] as ReactElement<StepProps>;
  const currentStepTitle = currentStepElement?.props?.title;

  return (
    <View style={[styles.container, style]}>
      {/* Progress Bar Container */}
      <View style={styles.progressContainer}>
        {/* Progress Track */}
        <View style={styles.progressTrack}>
          {/* Animated Progress Fill */}
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          {/* Progress Dots */}
          {validSteps.map((step, index) => {
            // const stepElement = step as ReactElement<StepProps>;
            return (
              <View
                key={index}
                style={[
                  {
                    left: `${(index / (validSteps.length - 1)) * 100}%`,
                    backgroundColor:
                      index <= currentStep ? theme.colors.primary : '#E0E0E0',
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Progress Text */}
        <Text style={styles.progressText}>
          {currentStepTitle ||
            `Step ${currentStep + 1} of ${validSteps.length}`}
        </Text>
      </View>

      {/* Current Step Content */}
      <View style={styles.stepContent}>{currentStepElement}</View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <Button
            label="Back"
            onPress={prevStep}
            variant="outline"
            style={{flex: 1}}
          />
        )}

        {currentStep === validSteps.length - 1 ? (
          submitButton ? (
            submitButton
          ) : (
            <Button
              label={currentStep === validSteps.length - 1 ? 'Finish' : 'Next'}
              onPress={nextStep}
              fullWidth={currentStep === 0}
              style={{flex: 1}}
              disabled={nextButtonDisabled}
            />
          )
        ) : (
          <Button
            label={currentStep === validSteps.length - 1 ? 'Finish' : 'Next'}
            onPress={nextStep}
            fullWidth={currentStep === 0}
            style={{flex: 1}}
            disabled={nextButtonDisabled}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  progressContainer: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: SPACING.sm,
  },
  progressTrack: {
    marginTop: 15,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    position: 'relative',
    overflow: 'visible',
  },
  progressFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: darkTheme.colors.primary,
    borderRadius: 5,
    zIndex: 2,
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -3,
    zIndex: 3,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 5,
  },
});

// Export both MultiStep and Step
export {MultiStep, Step};
