export const validationLoginFormSchema = {
  email: {
    required: {value: true, message: 'Email is required'},
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Please enter a valid email address',
    },
  },
  password: {
    required: {value: true, message: 'Password name is required'},
  },
};
