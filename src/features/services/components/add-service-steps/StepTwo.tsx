import {FormInput} from '@components/auto-form/form-fields/Input';
import {FormSelect} from '@components/auto-form/form-fields/Select';
import {FormMultiImageUpload} from '@components/auto-form/form-fields/Upload';
import {FC} from 'react';
import {View} from 'react-native';

interface StepTwoProps {
  formControl: any;
  style?: any;
}

const languages = [
  {code: 'fr', name: 'Français'},
  {code: 'en', name: 'Anglais'},
  {code: 'ar', name: 'Arabe'},
  {code: 'es', name: 'Espagnol'},
  {code: 'pt', name: 'Portugais'},
  {code: 'wo', name: 'Wolof'},
  {code: 'bm', name: 'Bambara'},
];

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

      <FormInput
        label="Zone d'intervention"
        placeholder="Zone d'intervention"
        name="service_area"
        formControl={formControl}
        isRequired={true}
      />

      <FormSelect
        label="Langues parlées"
        placeholder="Select Langues parlées"
        name="spoken_languages"
        formControl={formControl}
        isRequired={true}
        options={languages.map(lang => ({
          value: lang.code,
          label: lang.name,
        }))}
      />
    </View>
  );
};
