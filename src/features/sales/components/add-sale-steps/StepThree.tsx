import {FormInput} from '@components/auto-form/form-fields/Input';
import {FormSelect} from '@components/auto-form/form-fields/Select';
import {FC} from 'react';
import {View} from 'react-native';

interface StepThreeProps {
  formControl: any;
}

export const StepThree: FC<StepThreeProps> = ({formControl}) => {
  return (
    <View>
      <FormInput
        label="Prix"
        placeholder="Ex: 50"
        name="price"
        formControl={formControl}
        isRequired={true}
        keyboardType="number-pad"
      />

      <FormSelect
        label="État"
        placeholder="Sélectionnez l'état"
        name="condition"
        formControl={formControl}
        isRequired={true}
        options={[
          {value: 'new', label: 'Neuf'},
          {value: 'very-good', label: 'Très bon état'},
          {value: 'good', label: 'Bon état'},
          {value: 'average', label: 'État moyen'},
          {value: 'for-parts', label: 'Pour pièces'},
        ]}
      />
    </View>
  );
};
