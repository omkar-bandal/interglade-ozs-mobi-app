import {FormInput} from '@components/auto-form/form-fields/Input';
import {FC} from 'react';
import {View} from 'react-native';

interface StepFourProps {
  formControl: any;
  style?: any;
}

export const StepFour: FC<StepFourProps> = ({formControl, style}) => {
  return (
    <View style={style}>
      <FormInput
        label="Adresse"
        placeholder="Location"
        name="location"
        formControl={formControl}
        isRequired={true}
      />
    </View>
  );
};
