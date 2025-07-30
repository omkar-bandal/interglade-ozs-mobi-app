import ScreenHeader from '@components/header/ScreenHeader';
import SaleDetails from '@features/booking-details/components/SaleDetails';
import ServiceDetails from '@features/booking-details/components/ServiceDetails';
import {Contact} from '@features/contact/components/Contact';
import {useGetAllSales} from '@hooks/api/sales.rq';
import {useGetAllServices} from '@hooks/api/service.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

const ServiceDetailsScreen = ({route}: any) => {
  const {theme, themeType} = useTheme();
  const {type = 'service', id = null} = route?.params || {};
  const {user} = useTypedSelector(state => state.auth);
  const {data: servicesData} = useGetAllServices();
  const {data: salesData} = useGetAllSales();
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null,
  );

  // Use a callback for handling service selection to prevent re-renders
  const handleContactClick = useCallback((): void => {
    // Get the service data first
    if (type === 'service') {
      const selectedService = servicesData?.data?.find(
        (service: any) => service.id === id,
      );

      if (selectedService?.provider_id === user?.id) {
        return;
      }

      if (selectedService?.provider_id) {
        setSelectedProviderId(selectedService.provider_id);
      }
    }

    if (type === 'sale') {
      const selectedSale = salesData?.data?.find((sale: any) => sale.id === id);

      if (selectedSale?.provider_id === user?.id) {
        return;
      }

      if (selectedSale?.provider_id) {
        setSelectedProviderId(selectedSale.provider_id);
      }
    }
  }, [id, type, servicesData?.data, salesData?.data, user?.id]);

  const renderContent = () => {
    if (type === 'service') {
      return <ServiceDetails serviceId={id} />;
    }

    if (type === 'sale') {
      return <SaleDetails saleId={id} />;
    }

    return null;
  };
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ScreenHeader
        title={type === 'service' ? 'Service Details' : 'Sale Details'}
        rightContent={
          <Contact
            onContactClick={handleContactClick}
            selectedProviderId={selectedProviderId || ''}
          />
        }
      />
      {renderContent()}
      {/* <ServiceDetails serviceId={serviceId} /> */}
    </View>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
