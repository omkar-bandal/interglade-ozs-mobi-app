import {FormInput} from '@components/auto-form/form-fields/Input';
import {FormSelect} from '@components/auto-form/form-fields/Select';
import {
  useGetAllSalesCategories,
  useGetAllSubCategoriesByID,
  useGetPredefineItemsBySubCategroryId,
} from '@hooks/api/category.rq';
//import {darkTheme, SPACING} from '@theme/constants';
import {FC, useMemo} from 'react';
import {View} from 'react-native';
//import {StyleSheet, View} from 'react-native';

interface StepOneProps {
  formControl: any;
  style?: any;
}

export const StepOne: FC<StepOneProps> = ({formControl, style}) => {
  const {data} = useGetAllSalesCategories();
  const {data: subcategoryData} = useGetAllSubCategoriesByID(
    formControl.watch('category'),
    'vente',
  );
  const {data: predefinedData} = useGetPredefineItemsBySubCategroryId(
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
      value: item.id,
      label: item.name,
    }));
  }, [predefinedData]);

  return (
    <View style={style}>
      <FormInput
        label="Title"
        placeholder="Ex: iPhone 13 Pro Max - 256Go"
        name="title"
        formControl={formControl}
        isRequired={true}
      />

      <FormSelect
        label="Catégorie"
        placeholder="Select Catégorie"
        name="category"
        selectedValue={parseInt(formControl.watch('category'))}
        onSelect={category => {
          formControl.setValue('category', category);
          formControl.setValue('subcategory', null);
          formControl.setValue('items', []);
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
            formControl.setValue('items', []);
          }}
          isRequired={true}
          options={subCategories}
        />
      )}

      {formControl.watch('subcategory') && (
        <FormSelect
          label="Articles proposés"
          placeholder="Select Articles proposés"
          name="items"
          multiple={true}
          selectedValue={formControl
            .watch('items')
            .map((item: any) => parseInt(item))}
          onSelect={items => {
            formControl.setValue('items', items);
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

// const styles = StyleSheet.create({
//   container: {
//     padding: SPACING.sm,
//     borderWidth: 1,
//     borderColor: darkTheme.colors.border,
//     borderRadius: 10,
//   },
// });
