import darkTheme from '@theme/dark';
import {forwardRef} from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import Input from '../../ui/Input';
import Typography from '../../ui/Typography';

interface FormControlType {
  register?: (name: string, validation?: any) => any;
  handleSubmit?: (callback: (data: any) => void) => () => void;
}

interface FormInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  isRequired?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  name?: string;
  formControl?: FormControlType;
  validation?: any;
}

export const FormInput = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry = false,
      keyboardType = 'default',
      error,
      isRequired = false,
      autoCapitalize = 'none',
      maxLength,
      editable = true,
      multiline = false,
      numberOfLines = 1,
      name, // For useForm integration
      formControl = {}, // For useForm integration
      ...props
    }: FormInputProps,
    ref: any,
  ) => {
    // Handle useForm integration
    const inputProps =
      name && formControl.register
        ? formControl.register(name, props.validation)
        : {value, onChangeText, error};

    return (
      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Typography style={styles.inputLabel}>{label}</Typography>
          {isRequired && <Typography style={styles.requiredStar}>*</Typography>}
        </View>

        <Input
          ref={ref}
          style={[!editable && styles.disabledInput]}
          error={error || inputProps.error}
          value={inputProps.value}
          onChangeText={inputProps.onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...props}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: darkTheme.colors.textSecondary,
  },
  requiredStar: {
    color: '#e74c3c',
    fontSize: 14,
    marginLeft: 4,
  },
  disabledInput: {
    backgroundColor: '#f9f9f9',
    color: '#999',
  },
});
