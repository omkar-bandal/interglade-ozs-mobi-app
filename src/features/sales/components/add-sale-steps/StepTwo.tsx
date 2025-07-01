import {FormMultiImageUpload} from '@components/auto-form/form-fields/Upload';
import {FC} from 'react';
import {View} from 'react-native';

interface StepTwoProps {
  formControl: any;
  style?: any;
}

export const StepTwo: FC<StepTwoProps> = ({formControl, style}) => {
  return (
    <View style={style}>
      <FormMultiImageUpload
        label="Upload Gallery Images"
        name="photos"
        formControl={formControl}
        maxFiles={3}
        maxSize={5}
      />
    </View>
  );
};
