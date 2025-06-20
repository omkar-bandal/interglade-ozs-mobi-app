import {FormMultiImageUpload} from '@components/auto-form/form-fields/Upload';
import {FC} from 'react';

interface StepTwoProps {
  formControl: any;
}

export const StepTwo: FC<StepTwoProps> = ({formControl}) => {
  return (
    <FormMultiImageUpload
      label="Upload Gallery Images"
      name="photos"
      formControl={formControl}
      maxFiles={3}
      maxSize={5}
    />
  );
};
