import {useActions} from '@hooks/useActions';
import React, {FC, useEffect} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SuccessScreenProps {
  message?: string;
  redirectText?: string;
  redirectDelay?: number;
  onRedirect: () => void;
  buttonText?: string;
  showTimer?: boolean;
}

/**
 * A reusable success screen component with animation and auto-redirect
 */
const SuccessScreen: FC<SuccessScreenProps> = ({
  message = 'Successfully submitted!',
  onRedirect,
  buttonText = 'Continue',
}) => {
  const {setSuccess} = useActions();
  const checkmarkScale = new Animated.Value(0);
  const messageOpacity = new Animated.Value(0);
  const buttonOpacity = new Animated.Value(0);

  useEffect(() => {
    // Fix for animation not starting properly in some cases
    const animationTimeout = setTimeout(() => {
      // Start animations in sequence
      Animated.sequence([
        Animated.timing(checkmarkScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(animationTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = (): void => {
    onRedirect();
    setSuccess(false);
  };

  // Custom checkmark component with improved styling
  const CheckMark = () => (
    <Animated.View
      style={[
        styles.checkmarkContainer,
        {transform: [{scale: checkmarkScale}]},
      ]}>
      <View style={styles.checkmarkCircle}>
        <Icon name="checkmark" size={40} color="#4CAF50" />
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <CheckMark />

      <Animated.Text style={[styles.message, {opacity: messageOpacity}]}>
        {message}
      </Animated.Text>

      <Animated.View
        style={[styles.redirectContainer, {opacity: buttonOpacity}]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRedirect}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkmarkCircle: {
    width: 40,
    height: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkKick: {
    position: 'absolute',
    width: 3,
    height: 9,
    backgroundColor: '#4CAF50',
    left: 8,
    top: 18,
    borderRadius: 1,
    transform: [{rotate: '-45deg'}],
  },
  message: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  redirectContainer: {
    alignItems: 'center',
    width: '100%',
  },
  redirectText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#757575',
  },
});

export default SuccessScreen;
