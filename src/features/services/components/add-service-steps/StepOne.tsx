import {FormInput} from '@components/auto-form/form-fields/Input';
import {FormSelect} from '@components/auto-form/form-fields/Select';
import {
  useGetAllServiceCategories,
  useGetAllSubCategoriesByID,
  useGetPredefineServicesBySubCategroryId,
} from '@hooks/api/category.rq';
import {FC, useMemo} from 'react';
import {View} from 'react-native';

interface StepOneProps {
  formControl: any;
}

export const StepOne: FC<StepOneProps> = ({formControl}) => {
  const {data} = useGetAllServiceCategories();
  const {data: subcategoryData} = useGetAllSubCategoriesByID(
    formControl.watch('category'),
    'service',
  );
  const {data: predefinedData} = useGetPredefineServicesBySubCategroryId(
    formControl.watch('subcategory'),
  );

  const categories = useMemo(() => {
    return data?.data?.map((item: any) => ({value: item.id, label: item.name}));
  }, [data]);

  const subCategories = useMemo(() => {
    return subcategoryData?.data?.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
  }, [subcategoryData]);

  const predefinedItems = useMemo(() => {
    return predefinedData?.data?.map((item: any) => ({
      value: item.name,
      label: item.name,
    }));
  }, [predefinedData]);

  return (
    <View>
      <FormSelect
        label="Catégorie"
        placeholder="Select Catégorie"
        name="category"
        selectedValue={parseInt(formControl.watch('category'))}
        onSelect={category => {
          formControl.setValue('category', category);
          formControl.setValue('subcategory', null);
          formControl.setValue('services', []);
        }}
        isRequired={true}
        options={categories}
      />

      {formControl.watch('category') && (
        <FormSelect
          label="Sous-catégorie"
          placeholder="Select Sous-catégorie"
          name="subcategory"
          selectedValue={parseInt(formControl.watch('subcategory'))}
          onSelect={subcategory => {
            formControl.setValue('subcategory', subcategory);
            formControl.setValue('services', []);
          }}
          isRequired={true}
          options={subCategories}
        />
      )}

      {formControl.watch('subcategory') && (
        <FormSelect
          label="Services proposés"
          placeholder="Select Services proposés"
          name="services"
          multiple={true}
          selectedValue={formControl.watch('services')}
          onSelect={services => {
            formControl.setValue('services', services);
          }}
          isRequired={true}
          options={predefinedItems}
        />
      )}

      <FormInput
        label="Description détaillée"
        placeholder="Décrivez votre article en détail (état, caractéristiques, accessoires inclus...)."
        name="description"
        formControl={formControl}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};
