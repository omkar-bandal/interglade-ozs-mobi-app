import ScreenHeader from '@components/header/ScreenHeader';
import ServiceDetails from '@features/booking-details/components/ServiceDetails';
import {Contact} from '@features/contact/components/Contact';
import {useGetAllServices} from '@hooks/api/service.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

const ServiceDetailsScreen = ({route}: any) => {
  const {theme, themeType} = useTheme();
  const {serviceId = null} = route?.params || {};
  const {user} = useTypedSelector(state => state.auth);
  const {data: servicesData} = useGetAllServices();
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null,
  );

  // Use a callback for handling service selection to prevent re-renders
  const handleContactClick = useCallback((): void => {
    // Get the service data first
    const selectedService = servicesData?.data?.find(
      (service: any) => service.id === serviceId,
    );

    // Check if the provider is the current user
    if (selectedService?.provider_id === user?.id) {
      return;
    }

    // Set the provider ID to trigger the hooks and effect
    if (selectedService?.provider_id) {
      setSelectedProviderId(selectedService.provider_id);
    }
  }, [serviceId, servicesData?.data, user?.id]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ScreenHeader
        title="Service Details"
        rightContent={
          <Contact
            onContactClick={handleContactClick}
            selectedProviderId={selectedProviderId || ''}
          />
        }
      />

      <ServiceDetails serviceId={serviceId} />
    </View>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
