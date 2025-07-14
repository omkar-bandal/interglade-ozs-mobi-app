/* eslint-disable react-native/no-inline-styles */
import {FormInput} from '@components/auto-form/form-fields/Input';
import {Form, FormButton} from '@components/ui/Form';
import {useForgotPassword} from '@hooks/api/auth.rq';
import {useActions} from '@hooks/useActions';
import useForm from '@hooks/useForm';
import {useNavigation} from '@react-navigation/native';
import {EmailRequestParams} from '@services/auth/auth.model';
import {darkTheme, FONT_SIZE, SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import React, {useRef, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {validationLoginFormSchema} from '../utils/validate';

export default function ForgotPasswordForm() {
  const {mutateAsync: forgotPassword, isPending} = useForgotPassword();
  const {setUser, setSession} = useActions();

  const formControl = useForm<any>(
    {
      email: '',
    },

    validationLoginFormSchema,
  );

  const handleLogin = async ({email}: EmailRequestParams) => {
    const {data, error} = await forgotPassword({
      email: email,
    });

    if (data.user) {
      await navigate('HomeTab');
      setUser(data.user);
      setSession(data.session);
      return;
    }

    if (error?.message) {
      console.log('error', error.message);
    }
  };

  const navigation = useNavigation();

  const [currentStep, setCurrentStep] = useState(1);
  // const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [loading, setLoading] = useState(false);

  const otpRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        otpRefs[index + 1].current?.focus();
      }
    }
  };

  const handleOtpKeyPress = (index: number, key: any) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleEmailSubmit = () => {
    // if (!email) {
    //   Alert.alert('Error', 'Please enter your email address');
    //   return;
    // }
    nextStep();
  };

  const handleOtpSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }
    nextStep();
  };

  const handlePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    nextStep();
  };

  const renderEmailStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.titleText}>
        Enter your email address. You will receive an email to reset the
        password.
      </Text>

      <Form style={styles.form}>
        <View style={styles.input}>
          <FormInput
            label="Email Address"
            placeholder="Enter your email"
            name="email"
            formControl={formControl}
            isRequired={true}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formAction}>
          <FormButton
            label="Reset Password"
            disabled={isPending}
            loading={isPending}
            // formControl={formControl}
            onPress={handleEmailSubmit}
          />
        </View>
      </Form>
    </View>
  );

  const renderOtpStep = () => (
    <View style={styles.stepContainer}>
      {/* <Text style={styles.titleText}>Forgot Password</Text> */}
      <Text style={styles.subtitleText}>
        Enter OTP from your email address.
      </Text>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.labelText}>Enter OTP</Text> */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={otpRefs[index]}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : styles.otpInputEmpty,
              ]}
              value={digit}
              onChangeText={value => handleOtpChange(index, value)}
              onKeyPress={({nativeEvent}) =>
                handleOtpKeyPress(index, nativeEvent.key)
              }
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
      </View>

      {/* <TouchableOpacity
        style={styles.submitButton}
        onPress={handleOtpSubmit}
        disabled={loading}>
        <Text style={styles.submitButtonText}>
          {loading ? 'Verifying...' : 'Reset Password '}
        </Text>
      </TouchableOpacity> */}

      <View style={styles.formAction}>
        <FormButton
          label="Reset Password"
          disabled={isPending}
          loading={isPending}
          //formControl={formControl}
          onPress={handleOtpSubmit}
        />
      </View>
    </View>
  );

  const renderPasswordStep = () => (
    <View style={styles.stepContainer}>
      {/* <Text style={styles.titleText}>Create New Password</Text>
      <Text style={styles.subtitleText}>
        Create a new secure password for your account.
      </Text> */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.labelText}>New Password</Text> */}
          <TextInput
            style={styles.textInput}
            placeholder="Enter new password"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* <TouchableOpacity
        style={styles.submitButton}
        onPress={handlePasswordSubmit}
        disabled={loading}>
        <Text style={styles.submitButtonText}>
          {loading ? 'Updating...' : 'Reset Password'}
        </Text>
      </TouchableOpacity> */}

      <View style={styles.formAction}>
        <FormButton
          label="Reset Password"
          disabled={isPending}
          loading={isPending}
          // formControl={formControl}
          onPress={handlePasswordSubmit}
        />
      </View>
    </View>
  );

  const renderSuccessStep = () => (
    <View style={styles.successContainer}>
      <Text style={styles.titleText || {color: darkTheme.colors.primary}}>
        All Set.
      </Text>
      <Text style={styles.titleText || {color: darkTheme.colors.primary}}>
        Your password has been updated!!
      </Text>

      <TouchableOpacity
        style={[styles.submitButton, {paddingHorizontal: 100}]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.submitButtonText}>Go To Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderEmailStep();
      case 2:
        return renderOtpStep();
      case 3:
        return renderPasswordStep();
      case 4:
        return renderSuccessStep();
      default:
        return renderEmailStep();
    }
  };

  return (
    <>
      <View
        style={currentStep === 4 ? styles.successContainer : styles.container}>
        {renderCurrentStep()}
        {/* {currentStep > 1 && currentStep < 4 && (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={styles.backButtonText}>← Previous</Text>
          </TouchableOpacity>
        )} */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    paddingTop: SPACING.lg,
    //flex: 1,
  },
  //Reset Email 1st screen
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: darkTheme.colors.textTertiary,
    marginBottom: SPACING.md,
  },
  form: {
    paddingVertical: SPACING.sm,
  },
  formAction: {
    marginBottom: 4,
    marginStart: 4,
  },
  input: {
    marginBottom: 20,
  },

  //Reset Email 2st screen
  header: {
    //padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    fontSize: FONT_SIZE.md,
    color: '#A4A4A5',
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingLeft: SPACING.md,
    fontSize: FONT_SIZE.md,
    backgroundColor: 'white',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: SPACING.sm,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 8,
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    textAlign: 'center',
    //color:'#FDF6E3'
  },
  otpInputEmpty: {
    backgroundColor: '#FDF6E3',
    borderWidth: 1,
    borderColor: '#C49E00',
  },
  otpInputFilled: {
    backgroundColor: darkTheme.colors.primary,
    color: 'white',
  },
  submitButton: {
    backgroundColor: darkTheme.colors.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  submitButtonText: {
    color: 'white',
    fontSize: FONT_SIZE.sm,
    fontWeight: 300,
  },

  //Reset Email 3rd screen
  resendButton: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  resendText: {
    color: darkTheme.colors.primaryDark,
    fontSize: FONT_SIZE.md,
    textDecorationLine: 'underline',
  },

  ////Reset 4th screen
  container: {
    padding: SPACING.sm,
  },
  successContainer: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
