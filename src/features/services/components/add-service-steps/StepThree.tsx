import {FormInput} from '@components/auto-form/form-fields/Input';
import {FormRadioGroup} from '@components/auto-form/form-fields/Radio';
import {FormSelect} from '@components/auto-form/form-fields/Select';
import {FC} from 'react';
import {View} from 'react-native';

interface StepThreeProps {
  formControl: any;
}

const billingTypeOptions = [
  {label: 'Taux horaire', value: 'hourly'},
  {label: 'Forfait', value: 'fixed'},
];

export const timeSlots = [
  {id: 'all-day', label: 'Toute la journée'},
  {id: '6-9', label: '6h - 9h'},
  {id: '9-12', label: '9h - 12h'},
  {id: '12-15', label: '12h - 15h'},
  {id: '15-18', label: '15h - 18h'},
  {id: '18-21', label: '18h - 21h'},
  {id: '21-24', label: '21h - 24h'},
  {id: 'all-night', label: 'Toute la nuit'},
] as const;

export const StepThree: FC<StepThreeProps> = ({formControl}) => {
  return (
    <View>
      <FormRadioGroup
        label="Type de facturation"
        name="billing_type"
        formControl={formControl}
        options={billingTypeOptions}
        isRequired={true}
      />

      <FormInput
        label="Prix"
        placeholder="Ex: 50"
        name="price"
        formControl={formControl}
        isRequired={true}
        keyboardType="number-pad"
      />

      <FormSelect
        label="Disponibilités"
        placeholder="Sélectionnez Disponibilités"
        name="availability"
        formControl={formControl}
        isRequired={true}
        multiple={true}
        options={timeSlots.map(slot => ({
          label: slot.label,
          value: slot.id,
        }))}
      />
    </View>
  );
};
