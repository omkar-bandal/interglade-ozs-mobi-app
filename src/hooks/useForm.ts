import {useCallback, useRef, useState} from 'react';

// Define types for validation rules
interface ValidationRule {
  value: any;
  message: string;
}

interface ValidationSchema {
  [key: string]: {
    required?: ValidationRule;
    pattern?: {value: RegExp; message: string};
    minLength?: ValidationRule;
    maxLength?: ValidationRule;
    min?: ValidationRule;
    max?: ValidationRule;
    validate?: (value: any, values: Record<string, any>) => string | undefined;
  };
}

// Define return type for register function
interface RegisterOptions {
  validate?: (value: any, values: Record<string, any>) => string | undefined;
  [key: string]: any;
}

interface FieldAttributes<T> {
  name: keyof T;
  value: any;
  onChangeText: (text: any) => void;
  ref: (ref: any) => void;
  error?: string;
}

// Define return type for the hook
interface UseFormReturn<T extends Record<string, any>> {
  register: (name: keyof T, options?: RegisterOptions) => FieldAttributes<T>;
  handleSubmit: (
    onSubmit: (data: T) => Promise<void> | void,
    onError?: (errors: Record<string, string>, values: T) => void,
  ) => (event?: any) => Promise<void>;
  errors: Record<string, string>;
  values: T;
  setValue: (name: keyof T, value: any, shouldValidate?: boolean) => void;
  getValues: () => T;
  reset: (newValues?: Partial<T>) => void;
  watch: (name?: keyof T) => any;
  setError: (name: keyof T, error: string) => void;
  clearErrors: (name?: keyof T) => void;
  isSubmitting: boolean;
  isValid: boolean;
}

// Custom hook that provides similar functionality to react-hook-form
function useForm<T extends Record<string, any> = Record<string, any>>(
  defaultValues: T = {} as T,
  validationSchema: ValidationSchema = {},
): UseFormReturn<T> {
  // Store form values
  const [values, setValues] = useState<T>(defaultValues);

  // Store form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Track if form has been submitted
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Track if form is currently submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Store field refs
  const fieldRefs = useRef<Record<string, any>>({});

  // Register a field
  const register = useCallback(
    (name: keyof T, options: RegisterOptions = {}) => {
      return {
        name,
        value: values[name] !== undefined ? values[name] : '',
        onChangeText: (text: any) => {
          setValues(
            prevValues =>
              ({
                ...prevValues,
                [name]: text,
              } as T),
          );

          // Clear error when user types if the field was previously in error
          if (errors[name as string]) {
            setErrors(prevErrors => {
              const newErrors = {...prevErrors};
              delete newErrors[name as string];
              return newErrors;
            });
          }

          // Run onChange validation if provided
          if (options.validate && isSubmitted) {
            const error = options.validate(text, values);
            if (error) {
              setErrors(prevErrors => ({
                ...prevErrors,
                [name as string]: error,
              }));
            }
          }
        },
        ref: (ref: any) => {
          if (ref) {
            fieldRefs.current[name as string] = ref;
          }
        },
        error: errors[name as string],
      };
    },
    [values, errors, isSubmitted],
  );

  // Set a specific field value
  const setValue = useCallback(
    (name: keyof T, value: any, shouldValidate: boolean = false) => {
      setValues(
        prevValues =>
          ({
            ...prevValues,
            [name]: value,
          } as T),
      );

      if (shouldValidate && validationSchema[name as string]) {
        const error = validateField(name as string, value);
        if (error) {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name as string]: error,
          }));
        } else {
          setErrors(prevErrors => {
            const newErrors = {...prevErrors};
            delete newErrors[name as string];
            return newErrors;
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validationSchema],
  );

  // Get all field values
  const getValues = useCallback((): T => {
    return values;
  }, [values]);

  // Validate a specific field
  const validateField = useCallback(
    (name: string, value?: any): string => {
      const fieldValue = value !== undefined ? value : values[name as keyof T];
      const fieldValidation = validationSchema[name];

      if (!fieldValidation) {
        return '';
      }

      // Required validation
      if (
        fieldValidation.required &&
        (!fieldValue || (typeof fieldValue === 'string' && !fieldValue.trim()))
      ) {
        return fieldValidation.required.message || `${name} is required`;
      }

      // Pattern validation
      if (
        fieldValidation.pattern &&
        fieldValue &&
        !fieldValidation.pattern.value.test(fieldValue)
      ) {
        return fieldValidation.pattern.message || `${name} is invalid`;
      }

      // Min length validation
      if (
        fieldValidation.minLength &&
        fieldValue &&
        fieldValue.length < fieldValidation.minLength.value
      ) {
        return (
          fieldValidation.minLength.message ||
          `${name} must be at least ${fieldValidation.minLength.value} characters`
        );
      }

      // Max length validation
      if (
        fieldValidation.maxLength &&
        fieldValue &&
        fieldValue.length > fieldValidation.maxLength.value
      ) {
        return (
          fieldValidation.maxLength.message ||
          `${name} must be less than ${fieldValidation.maxLength.value} characters`
        );
      }

      // Min validation
      if (
        fieldValidation.min &&
        fieldValue &&
        Number(fieldValue) < fieldValidation.min.value
      ) {
        return (
          fieldValidation.min.message ||
          `${name} must be at least ${fieldValidation.min.value}`
        );
      }

      // Max validation
      if (
        fieldValidation.max &&
        fieldValue &&
        Number(fieldValue) > fieldValidation.max.value
      ) {
        return (
          fieldValidation.max.message ||
          `${name} must be less than ${fieldValidation.max.value}`
        );
      }

      // Custom validation
      if (fieldValidation.validate && fieldValue) {
        const validationResult = fieldValidation.validate(fieldValue, values);
        if (validationResult) {
          return validationResult;
        }
      }

      return '';
    },
    [values, validationSchema],
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Loop through all validation rules
    Object.keys(validationSchema).forEach(name => {
      const error = validateField(name);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, validationSchema]);

  // Handle form submission
  const handleSubmit = useCallback(
    (
      onSubmit: (data: T) => Promise<void> | void,
      onError?: (errors: Record<string, string>, values: T) => void,
    ) => {
      return async (event?: any) => {
        if (event && event.preventDefault) {
          event.preventDefault();
        }

        setIsSubmitted(true);

        const isValid = validateForm();

        if (isValid) {
          setIsSubmitting(true);
          try {
            await onSubmit(values);
          } catch (error) {
            if (onError) {
              onError(errors, values);
            }
          } finally {
            setIsSubmitting(false);
          }
        } else if (onError) {
          const firstErrorField = Object.keys(errors)[0];
          if (
            firstErrorField &&
            fieldRefs.current[firstErrorField] &&
            fieldRefs.current[firstErrorField].focus
          ) {
            fieldRefs.current[firstErrorField].focus();
          }
          onError(errors, values);
        }
      };
    },
    [validateForm, values, errors],
  );

  // Reset form
  const reset = useCallback(
    (newValues: Partial<T> = defaultValues) => {
      setValues(newValues as T);
      setErrors({});
      setIsSubmitted(false);
    },
    [defaultValues],
  );

  // Watch for value changes
  const watch = useCallback(
    (name?: keyof T) => {
      if (name) {
        return values[name];
      }
      return values;
    },
    [values],
  );

  // Set form error
  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name as string]: error,
    }));
  }, []);

  // Clear errors
  const clearErrors = useCallback((name?: keyof T) => {
    if (name) {
      setErrors(prevErrors => {
        const newErrors = {...prevErrors};
        delete newErrors[name as string];
        return newErrors;
      });
    } else {
      setErrors({});
    }
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    values,
    setValue,
    getValues,
    reset,
    watch,
    setError,
    clearErrors,
    isSubmitting,
    isValid: Object.keys(errors).length === 0,
  };
}

export default useForm;
