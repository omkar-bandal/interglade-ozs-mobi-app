export const validationServiceFormSchema = {
  services: {
    required: {value: true, message: 'title name is required'},
  },
  category: {
    required: {value: true, message: 'category is required'},
  },
  subcategory: {
    required: {value: true, message: 'subcategory is required'},
  },
  description: {
    required: {value: true, message: 'description is required'},
  },
  photos: {
    validate: (value: any) => {
      if (value.length === 0) {
        return 'Photos must be uploaded';
      }
      return '';
    },
  },
  price: {
    required: {value: true, message: 'price is required'},
  },
  service_area: {
    required: {value: true, message: 'location is required'},
  },
};
