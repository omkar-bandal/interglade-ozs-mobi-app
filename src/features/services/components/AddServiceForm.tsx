import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {MultiStep, Step} from '@components/MultiStep';
import {Form, FormButton, FormError} from '@components/ui/Form';
import {useCreateService, useUpdateService} from '@hooks/api/service.rq';
import {useActions} from '@hooks/useActions';
import useForm from '@hooks/useForm';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {uploadFile} from '@utils/upload.utils';
import {validationServiceFormSchema} from '../utils/validate';
import {StepOne} from './add-service-steps/StepOne';
import {StepThree} from './add-service-steps/StepThree';
import {StepTwo} from './add-service-steps/StepTwo';
import {Summary} from './add-service-steps/Summary';

export default function AddServiceForm({initialData, serviceId}: any) {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const {user} = useTypedSelector(state => state.auth);
  const {mutateAsync: createService, isPending} = useCreateService();
  const {mutateAsync: updateService, isPending: isUpdatePending} =
    useUpdateService();
  const formControl = useForm<any>(initialData, validationServiceFormSchema);
  const {setSuccess, updateMyService, addService} = useActions();
  const [formError, setFormError] = useState('');

  const handleComplete = async () => {
    const {values} = formControl;

    const uploadedPhotos: string[] = [];
    for (const file of values.photos) {
      if (typeof file === 'string') {
        uploadedPhotos.push(file);
      } else {
        try {
          const publicUrl = await uploadFile(file);
          if (publicUrl) {
            uploadedPhotos.push(publicUrl);
          }
        } catch (error: any) {
          console.log('Upload error', error);
        }
      }
    }

    setFormError('');
    const serviceData = {
      provider_id: user?.id,
      title: values.services.join(', '),
      description: values.description,
      price: parseFloat(values.price),
      category_id: parseInt(values.category),
      subcategory_id: parseInt(values.subcategory),
      availability: values.availability,
      photos: uploadedPhotos,
      location: values.service_area,
      updated_at: new Date().toISOString(),
    };
    if (serviceId) {
      const updatedResult = await updateService({
        service: serviceData,
        serviceId,
      });
      if (updatedResult?.status === 204) {
        updateMyService(serviceData as any);
        setSuccess(true);
      }
    } else {
      const result = await createService(serviceData);
      if (result?.status === 201) {
        addService(serviceData as any);
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
            label={serviceId ? 'Update Service' : 'Add Service'}
            disabled={isPending || isUpdatePending}
            loading={isPending}
            onPress={formControl.handleSubmit(handleComplete, onError)}
            style={{flex: 1}}
          />
        }>
        <Step title="Détails de l'article">
          <StepOne formControl={formControl} style={styles.formContainer} />
        </Step>
        <Step title="Photos de l'article">
          <StepTwo formControl={formControl} style={styles.formContainer} />
        </Step>
        <Step title="Prix et état de l'article">
          <StepThree formControl={formControl} style={styles.formContainer} />
        </Step>
        <Step title="Récapitulatif et publication">
          <Summary formData={formControl.values} />
        </Step>
      </MultiStep>
    </Form>
  );
}

const themeStyles = (theme: any) =>
  StyleSheet.create({
    form: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    formContainer: {
      padding: SPACING.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      height: '100%',
      justifyContent: 'center',
    },
    formAction: {
      marginBottom: 4,
    },
    input: {
      marginBottom: 1,
    },
  });
