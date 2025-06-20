import {forwardRef} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import Typography from '../../ui/Typography';

interface FormControlType {
  register?: (name: string, validation?: any) => any;
  handleSubmit?: (callback: (data: any) => void) => () => void;
}

interface FormSwitchProps {
  label: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  name?: string;
  formControl?: FormControlType;
  validation?: any;
}

export const FormSwitch = forwardRef(
  (
    {
      label,
      value,
      onValueChange,
      disabled = false,
      name, // For useForm integration
      formControl = {}, // For useForm integration
      ...props
    }: FormSwitchProps,
    ref: any,
  ) => {
    // Handle useForm integration
    let switchValue = value;
    let handleChange = onValueChange;

    if (name && formControl.register) {
      const inputProps = formControl.register(name, props.validation);
      switchValue = inputProps.value === true;
      handleChange = newValue => inputProps.onChangeText(newValue);
    }

    return (
      <View style={styles.switchContainer}>
        <Typography
          style={[styles.switchLabel, disabled && styles.disabledText]}>
          {label}
        </Typography>
        <Switch
          ref={ref}
          value={switchValue}
          onValueChange={handleChange}
          trackColor={{false: '#D1D1D6', true: '#3498db'}}
          thumbColor={switchValue ? '#fff' : '#fff'}
          ios_backgroundColor="#D1D1D6"
          disabled={disabled}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },

  // Switch styles
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  disabledText: {
    color: '#999',
  },
});
