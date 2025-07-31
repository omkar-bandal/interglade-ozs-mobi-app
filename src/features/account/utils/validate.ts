export const validationAddressSchema = {
  address_title: {
    required: {value: true, message: 'Address title is required'},
  },
  city: {
    required: {value: true, message: 'City is required'},
  },
  //   zipCode: {
  //     required: {value: true, message: 'ZIP code is required'},
  //     pattern: {
  //       value: /^\d{6}(-\d{4})?$/,
  //       message: 'Please enter a valid ZIP code',
  //     },
  //   },
};
