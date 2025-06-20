import {forwardRef} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography from '../../ui/Typography';

interface FormControlType {
  register?: (name: string, validation?: any) => any;
  handleSubmit?: (callback: (data: any) => void) => () => void;
}

interface SelectOption {
  label: string;
  value: string | number;
}

interface FormRadioGroupProps {
  label: string;
  options: SelectOption[];
  selectedValue?: string | number;
  onValueChange?: (value: string | number) => void;
  error?: string;
  isRequired?: boolean;
  disabled?: boolean;
  name?: string;
  formControl?: FormControlType;
  validation?: any;
}

export const FormRadioGroup = forwardRef(
  (
    {
      label,
      options = [],
      selectedValue,
      onValueChange,
      error,
      isRequired = false,
      disabled = false,
      name, // For useForm integration
      formControl = {}, // For useForm integration
      ...props
    }: FormRadioGroupProps,
    ref: any,
  ) => {
    // Handle useForm integration
    let radioValue = selectedValue;
    let handleChange = onValueChange;
    let radioError = error;

    if (name && formControl.register) {
      const inputProps = formControl.register(name, props.validation);
      radioValue = inputProps.value;
      handleChange = newValue => inputProps.onChangeText(newValue);
      radioError = inputProps.error;
    }

    return (
      <View style={styles.radioGroupContainer} ref={ref}>
        <View style={styles.labelContainer}>
          <Typography style={styles.inputLabel}>{label}</Typography>
          {isRequired && <Typography style={styles.requiredStar}>*</Typography>}
        </View>

        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[styles.radioOption, disabled && styles.disabledRadioOption]}
            onPress={() =>
              !disabled && handleChange && handleChange(option.value)
            }
            activeOpacity={disabled ? 1 : 0.7}>
            <View style={styles.radioButtonOuter}>
              {radioValue === option.value && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Typography
              style={[styles.radioLabel, disabled && styles.disabledText]}>
              {option.label}
            </Typography>
          </TouchableOpacity>
        ))}

        {radioError ? (
          <Typography style={styles.errorText}>{radioError}</Typography>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  // Form container
  formContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
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

  // Input styles
  inputContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  requiredStar: {
    color: '#e74c3c',
    fontSize: 14,
    marginLeft: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  focusedInput: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  errorInput: {
    borderColor: '#e74c3c',
  },
  disabledInput: {
    backgroundColor: '#f9f9f9',
    color: '#999',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingBottom: 12,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },

  // Button styles
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

  // Checkbox styles
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

  // Select styles
  selectContainer: {
    marginBottom: 16,
    zIndex: 1,
  },
  selectButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#A0A0A0',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#777',
  },
  optionsContainer: {
    position: 'absolute',
    top: 82,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  optionsList: {
    flex: 1,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#f2f9ff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#3498db',
    fontWeight: '500',
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

  // Radio button styles
  radioGroupContainer: {
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  disabledRadioOption: {
    opacity: 0.6,
  },
  radioButtonOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
});
