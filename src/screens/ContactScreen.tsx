import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {FormCheckbox} from '../components/auto-form/form-fields/Checkbox';
import {FormInput} from '../components/auto-form/form-fields/Input';
import {FormRadioGroup} from '../components/auto-form/form-fields/Radio';
import {FormSelect} from '../components/auto-form/form-fields/Select';
import {FormSwitch} from '../components/auto-form/form-fields/Switch';
import Button from '../components/ui/Button';
import {Form, FormError, FormGroup, FormSuccess} from '../components/ui/Form';
import useForm from '../hooks/useForm';

const ContactForm = () => {
  // Global form error and success
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Validation schema
  const validationSchema = {
    firstName: {
      required: {value: true, message: 'First name is required'},
    },
    lastName: {
      required: {value: true, message: 'Last name is required'},
    },
    email: {
      required: {value: true, message: 'Email is required'},
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Please enter a valid email address',
      },
    },
    phone: {
      pattern: {
        value: /^\d{10}$/,
        message: 'Please enter a valid 10-digit phone number',
      },
      validate: (value: any) => {
        if (value && value.replace(/[^0-9]/g, '').length !== 10) {
          return 'Phone number must be 10 digits';
        }
        return '';
      },
    },
    subject: {
      required: {value: true, message: 'Please select a subject'},
    },
    message: {
      required: {value: true, message: 'Message is required'},
      minLength: {value: 10, message: 'Message must be at least 10 characters'},
    },
    preferredContact: {
      required: {
        value: true,
        message: 'Please select preferred contact method',
      },
    },
    termsAccepted: {
      validate: (value: any) => {
        return value ? '' : 'You must accept the terms and conditions';
      },
    },
  };

  // Initialize form
  const formControl = useForm<any>(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredContact: '',
      newsletter: false,
      termsAccepted: false,
    },
    validationSchema,
  );

  // Subject options for dropdown
  const subjectOptions = [
    {label: 'General Inquiry', value: 'general'},
    {label: 'Technical Support', value: 'support'},
    {label: 'Billing Question', value: 'billing'},
    {label: 'Partnership Opportunity', value: 'partnership'},
    {label: 'Other', value: 'other'},
  ];

  // Contact method options for radio group
  const contactMethodOptions = [
    {label: 'Email', value: 'email'},
    {label: 'Phone', value: 'phone'},
    {label: 'Both', value: 'both'},
  ];

  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      setFormError('');
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Log form data
      console.log('Form submitted with:', data);

      // Show success message
      setFormSuccess(
        'Your message has been sent successfully! We will contact you soon.',
      );

      // Reset form after successful submission
      formControl.reset();
    } catch (error) {
      setFormError('An error occurred. Please try again later.');
      console.error('Submission error:', error);
    }
  };

  // Handle submission error
  const onError = (errors: any) => {
    console.log('Validation errors:', errors);
    setFormError('Please fix the errors in the form and try again.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>We'd love to hear from you!</Text>

      <Form
        formControl={formControl}
        style={styles.form}
        onSubmit={(data: any) => Alert.prompt(data)}>
        {/* Display form-level error or success message */}
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />

        <FormGroup title="Personal Information">
          <View style={styles.row}>
            <View style={styles.halfColumn}>
              <FormInput
                label="First Name"
                placeholder="Enter your first name"
                name="firstName"
                formControl={formControl}
                isRequired={true}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.halfColumn}>
              <FormInput
                label="Last Name"
                placeholder="Enter your last name"
                name="lastName"
                formControl={formControl}
                isRequired={true}
                autoCapitalize="words"
              />
            </View>
          </View>

          <FormInput
            label="Email Address"
            placeholder="Enter your email"
            name="email"
            formControl={formControl}
            isRequired={true}
            keyboardType="email-address"
          />

          <FormInput
            label="Phone Number"
            placeholder="Enter your phone number"
            name="phone"
            formControl={formControl}
            keyboardType="phone-pad"
          />

          <FormRadioGroup
            label="Preferred Contact Method"
            name="preferredContact"
            formControl={formControl}
            options={contactMethodOptions}
            isRequired={true}
          />
        </FormGroup>

        <FormGroup title="Message Details">
          <FormSelect
            label="Subject"
            placeholder="Select a subject"
            name="subject"
            formControl={formControl}
            options={subjectOptions}
            isRequired={true}
          />

          <FormInput
            label="Message"
            placeholder="Type your message here..."
            name="message"
            formControl={formControl}
            isRequired={true}
            multiline={true}
            numberOfLines={4}
          />
        </FormGroup>

        <FormGroup title="Preferences">
          <FormCheckbox
            label="Subscribe to our newsletter"
            name="newsletter"
            formControl={formControl}
          />

          <FormCheckbox
            label="I agree to the terms and privacy policy"
            name="termsAccepted"
            formControl={formControl}
          />

          <FormSwitch
            label="Dark Mode"
            name="darkMode"
            formControl={formControl}
          />
        </FormGroup>

        <Button
          label="Submit Form"
          onPress={formControl.handleSubmit(onSubmit, onError)}
          // isLoading={formControl.isSubmitting}
          disabled={formControl.isSubmitting}
        />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  halfColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
});

export default ContactForm;
