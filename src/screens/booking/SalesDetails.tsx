import ScreenHeader from '@components/header/ScreenHeader';
import SalesDetails from '@features/booking-details/components/SalesDetails';

import {Contact} from '@features/contact/components/Contact';
import {useGetAllSales} from '@hooks/api/sales.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

const SalesDetailsScreen = ({route}: any) => {
  const {theme} = useTheme();
  const {saleId = null} = route?.params || {};
  const {user} = useTypedSelector(state => state.auth);
  const {data: salesData} = useGetAllSales();
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null,
  );

  // Use a callback for handling service selection to prevent re-renders
  const handleContactClick = useCallback((): void => {
    // Get the service data first
    const selectedService = salesData?.data?.find(
      (sale: any) => sale.id === saleId,
    );

    // Check if the provider is the current user
    if (selectedService?.provider_id === user?.id) {
      return;
    }

    // Set the provider ID to trigger the hooks and effect
    if (selectedService?.provider_id) {
      setSelectedProviderId(selectedService.provider_id);
    }
  }, [saleId, salesData?.data, user?.id]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScreenHeader
        title="Sales Details"
        rightContent={
          <Contact
            onContactClick={handleContactClick}
            selectedProviderId={selectedProviderId || ''}
          />
        }
      />

      <SalesDetails saleId={saleId} />
    </View>
  );
};

export default SalesDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
