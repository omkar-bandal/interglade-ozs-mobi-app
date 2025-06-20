import {FormInput} from '@components/auto-form/form-fields/Input';
import {FC} from 'react';
import {View} from 'react-native';

interface StepFourProps {
  formControl: any;
}

export const StepFour: FC<StepFourProps> = ({formControl}) => {
  return (
    <View>
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
