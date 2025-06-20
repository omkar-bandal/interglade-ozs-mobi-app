import Button from '@components/ui/Button';
import {forwardRef, useCallback, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Typography from '../../ui/Typography';

interface FormControlType {
  register?: (name: string, validation?: any) => any;
  handleSubmit?: (callback: (data: any) => void) => () => void;
}

interface SelectOption {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  label: string;
  options: SelectOption[];
  selectedValue?: string | number | (string | number)[];
  onSelect?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
  name?: string;
  formControl?: FormControlType;
  validation?: any;
  multiple?: boolean;
}

export const FormSelect = forwardRef(
  (
    {
      label,
      options = [],
      selectedValue,
      onSelect,
      placeholder = 'Select an option',
      error,
      isRequired = false,
      name,
      formControl = {},
      multiple = false,
      ...props
    }: FormSelectProps,
    ref: any,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    // Handle useForm integration
    let selectValue = selectedValue;
    let handleSelectChange = onSelect;
    let selectError = error;

    if (name && formControl.register) {
      const inputProps = formControl.register(name, props.validation);
      selectValue = inputProps.value;
      handleSelectChange = newValue => inputProps.onChangeText(newValue);
      selectError = inputProps.error;
    }

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleSelect = useCallback(
      (value: string | number) => {
        if (!handleSelectChange) {
          return;
        }

        if (multiple) {
          const currentValues = Array.isArray(selectValue) ? selectValue : [];
          const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

          handleSelectChange(newValues);
        } else {
          handleSelectChange(value);
          setIsOpen(false);
        }
      },
      [multiple, selectValue, handleSelectChange],
    );

    const renderSelectedText = () => {
      if (!selectValue) {
        return placeholder;
      }

      if (multiple) {
        const selectedValues = Array.isArray(selectValue) ? selectValue : [];
        const selectedLabels = options
          .filter(option => selectedValues.includes(option.value))
          .map(option => option.label);

        return selectedLabels.length > 0
          ? selectedLabels.join(', ')
          : placeholder;
      }

      const selectedOption = options.find(
        option => option.value === selectValue,
      );
      return selectedOption ? selectedOption.label : placeholder;
    };

    // Implementation of our own bottom sheet instead of using ActionSheet
    const renderBottomSheet = () => {
      return (
        <Modal
          visible={isOpen}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.backdropTouchable}
              activeOpacity={1}
              onPress={() => setIsOpen(false)}
            />
            <View style={styles.bottomSheetContainer}>
              <View style={styles.bottomSheetHeader}>
                <Typography style={styles.bottomSheetTitle}>
                  Select options
                </Typography>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <Typography style={styles.closeButton}>✕</Typography>
                </TouchableOpacity>
              </View>

              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.optionsList}>
                {options.map(option => {
                  const isSelected = multiple
                    ? Array.isArray(selectValue) &&
                      selectValue.includes(option.value)
                    : selectValue === option.value;

                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.optionItem,
                        isSelected && styles.selectedOption,
                      ]}
                      onPress={() => handleSelect(option.value)}>
                      <Typography
                        style={[
                          styles.optionText,
                          isSelected && styles.selectedOptionText,
                        ]}>
                        {option.label}
                      </Typography>
                      {isSelected && (
                        <Typography style={styles.checkmarkIcon}>✓</Typography>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {multiple && (
                <View style={styles.bottomSheetFooter}>
                  <Button label="Done" onPress={() => setIsOpen(false)} />
                </View>
              )}
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <View style={styles.selectContainer}>
        <View style={styles.labelContainer}>
          <Typography style={styles.inputLabel}>{label}</Typography>
          {isRequired && <Typography style={styles.requiredStar}>*</Typography>}
        </View>

        <TouchableOpacity
          ref={ref}
          style={[styles.selectButton, selectError && styles.errorInput]}
          onPress={toggleDropdown}
          activeOpacity={0.7}>
          <Typography
            style={[
              styles.selectButtonText,
              !selectValue && styles.placeholderText,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {renderSelectedText()}
          </Typography>
          <Typography style={styles.dropdownIcon}>
            {isOpen ? '▲' : '▼'}
          </Typography>
        </TouchableOpacity>

        {/* Replace ActionSheet with our custom bottom sheet */}
        {renderBottomSheet()}

        {selectError ? (
          <Typography style={styles.errorText}>{selectError}</Typography>
        ) : null}
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
  errorInput: {
    borderColor: '#e74c3c',
  },
  selectContainer: {
    marginBottom: 16,
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
    flex: 1,
    marginRight: 10,
  },
  placeholderText: {
    color: '#A0A0A0',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // This ensures content is aligned to the bottom
  },
  backdropTouchable: {
    flex: 1,
  },
  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    fontSize: 20,
    color: '#777',
    padding: 5,
  },
  optionsList: {
    paddingBottom: 16,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f2f9ff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#3498db',
    fontWeight: '500',
  },
  checkmarkIcon: {
    color: '#3498db',
    fontSize: 18,
  },
  bottomSheetFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});
