import {forwardRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography from '../../ui/Typography';

interface FormControlType {
  register?: (name: string, validation?: any) => any;
  handleSubmit?: (callback: (data: any) => void) => () => void;
}
interface FormCheckboxProps {
  label: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  error?: string;
  name?: string;
  formControl?: FormControlType;
  validation?: any;
}
export const FormCheckbox = forwardRef(
  (
    {
      label,
      value,
      onValueChange,
      error,
      name, // For useForm integration
      formControl = {}, // For useForm integration
      ...props
    }: FormCheckboxProps,
    ref: any,
  ) => {
    // Handle useForm integration
    let checkboxValue = value || false;
    let handleChange = onValueChange;
    let checkboxError = error;

    if (name && formControl.register) {
      const inputProps = formControl.register(name, props.validation);
      checkboxValue = inputProps.value === true;
      handleChange = newValue => inputProps.onChangeText(newValue);
      checkboxError = inputProps.error;
    }

    return (
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          ref={ref}
          style={styles.checkboxTouchable}
          onPress={() => handleChange && handleChange(!checkboxValue)}
          activeOpacity={0.7}>
          <View style={[styles.checkbox, checkboxValue && styles.checkedBox]}>
            {checkboxValue && (
              <Typography style={styles.checkMark}>✓</Typography>
            )}
          </View>
          <Typography style={styles.checkboxLabel}>{label}</Typography>
        </TouchableOpacity>
        {checkboxError ? (
          <Typography style={styles.errorText}>{checkboxError}</Typography>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  checkboxContainer: {
    marginBottom: 16,
  },
  checkboxTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#3498db',
  },
  checkMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
});
