import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Button from './Button';

interface FormControlType {
  register?: (name: string, validation?: any) => any;
  handleSubmit?: (callback: (data: any) => void) => () => void;
  values?: any;
}

interface FormGroupProps {
  children: React.ReactNode;
  title?: string;
}

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
  style?: ViewStyle;
  formControl?: FormControlType;
}

interface FormMessageProps {
  message?: string;
}

// ===================== FORM GROUP COMPONENT =====================
export const FormGroup = ({children, title}: FormGroupProps) => {
  return (
    <View style={styles.formGroup}>
      {title && <Text style={styles.formGroupTitle}>{title}</Text>}
      <View style={styles.formGroupContent}>{children}</View>
    </View>
  );
};

// ===================== FORM CONTAINER COMPONENT =====================
export const Form = ({children, onSubmit, style, formControl}: FormProps) => {
  const handleSubmit =
    formControl && formControl.handleSubmit
      ? formControl.handleSubmit(formControl.values)
      : onSubmit;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.formContainer, style] as const}
      keyboardVerticalOffset={0}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const FormButton = ({formControl, onPress, ...rest}: any) => {
  const handleSubmit =
    formControl && formControl.handleSubmit
      ? formControl.handleSubmit(onPress)
      : onPress;

  return <Button onPress={handleSubmit} {...rest} />;
};

// ===================== FORM ERROR COMPONENT =====================
export const FormError = ({message}: FormMessageProps) => {
  if (!message) {
    return null;
  }
  return (
    <View style={styles.formErrorContainer}>
      <Text style={styles.formErrorText}>{message}</Text>
    </View>
  );
};

// ===================== FORM SUCCESS COMPONENT =====================
export const FormSuccess = ({message}: FormMessageProps) => {
  if (!message) {
    return null;
  }
  return (
    <View style={styles.formSuccessContainer}>
      <Text style={styles.formSuccessText}>{message}</Text>
    </View>
  );
};

// Styles remain the same as in your previous component
const styles = StyleSheet.create({
  // Form container
  formContainer: {
    // flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    // paddingBottom: 24,
  },

  //Button Styles
  button: {
    height: 48,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  fullWidth: {
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#2c3e50',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    borderColor: '#bdc3c7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  outlinedButtonText: {
    color: '#3498db',
  },
  disabledButtonText: {
    color: '#f5f5f5',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginHorizontal: 8,
  },

  // Form group
  formGroup: {
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  formGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  formGroupContent: {
    padding: 16,
  },

  // Form error and success messages
  formErrorContainer: {
    backgroundColor: '#FFECEC',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  formErrorText: {
    color: '#e74c3c',
    fontSize: 14,
  },
  formSuccessContainer: {
    backgroundColor: '#E7F9EF',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  formSuccessText: {
    color: '#2ecc71',
    fontSize: 14,
  },
});
