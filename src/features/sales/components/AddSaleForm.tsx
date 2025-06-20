import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {MultiStep, Step} from '@components/MultiStep';
import {Form, FormButton, FormError} from '@components/ui/Form';
import {useCreateSale, useUpdateSale} from '@hooks/api/sales.rq';
import {useActions} from '@hooks/useActions';
import useForm from '@hooks/useForm';
import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import {validationLoginFormSchema} from '../utils/validate';
import {StepFour} from './add-sale-steps/StepFour';
import {StepOne} from './add-sale-steps/StepOne';
import {StepThree} from './add-sale-steps/StepThree';
import {StepTwo} from './add-sale-steps/StepTwo';
import {Summary} from './add-sale-steps/Summary';

export default function AddSaleForm({initialData, saleId}: any) {
  const {theme} = useTheme();
  const {user} = useTypedSelector(state => state.auth);
  const {mutateAsync: createSale, isPending} = useCreateSale();
  const {mutateAsync: updateSale, isPending: isUpdatePending} = useUpdateSale();
  const formControl = useForm<any>(initialData, validationLoginFormSchema);
  const {setSuccess, updateMySale, addSale} = useActions();
  const [formError, setFormError] = useState('');

  const handleComplete = async () => {
    const {values} = formControl;
    setFormError('');
    const saleData = {
      seller_id: user?.id,
      title: values.title,
      description: values.description,
      price: parseFloat(values.price),
      condition: values.condition,
      location: values.location,
      // photos: values.photos || [],
      photos: [
        'https://wrcluqeamjnzjmpwxiet.supabase.co/storage/v1/object/public/service_photos/0f795369-6a59-483d-a75a-c07de416961f.png',
        'https://wrcluqeamjnzjmpwxiet.supabase.co/storage/v1/object/public/service_photos/91d182c5-8d20-425d-a399-046c88fb27d7.jfif',
        'https://wrcluqeamjnzjmpwxiet.supabase.co/storage/v1/object/public/service_photos/d3e651ca-c81a-4f65-a0e7-e00ffa409f4d.jpg',
      ],
      category_id: parseInt(values.category),
      subcategory_id: parseInt(values.subcategory),
      items: values.items || [],
      updated_at: new Date().toISOString(),
    };
    if (saleId) {
      const updatedResult = await updateSale({sale: saleData, saleId});
      if (updatedResult?.status === 204) {
        updateMySale(saleData as any);
        setSuccess(true);
      }
    } else {
      const result = await createSale(saleData);
      if (result?.status === 201) {
        addSale(saleData as any);
        setSuccess(true);
      }
    }
  };

  const onError = (errors: any) => {
    console.log('Validation errors:', errors);
    setFormError('Please fix the errors in the form and try again.');
  };

  return (
    <Form style={styles.form}>
      <FormError message={formError} />
      <MultiStep
        onComplete={() => console.log}
        style={{backgroundColor: theme.colors.background}}
        submitButton={
          <FormButton
            label={saleId ? 'Update Sale' : 'Add Sale'}
            disabled={isPending || isUpdatePending}
            loading={isPending}
            onPress={formControl.handleSubmit(handleComplete, onError)}
            style={{flex: 1}}
          />
        }>
        <Step title="Détails de l'article">
          <StepOne formControl={formControl} />
        </Step>
        <Step title="Photos de l'article">
          <StepTwo formControl={formControl} />
        </Step>
        <Step title="Prix et état de l'article">
          <StepThree formControl={formControl} />
        </Step>
        <Step title="Localisation">
          <StepFour formControl={formControl} />
        </Step>
        <Step title="Récapitulatif et publication">
          <Summary formData={formControl.values} />
        </Step>
      </MultiStep>
    </Form>
  );
}

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginBottom: 4,
  },
  input: {
    marginBottom: 1,
  },
});
