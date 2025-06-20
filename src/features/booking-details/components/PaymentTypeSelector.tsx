// PaymentTypeSelector.tsx
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const paymentTypes = [
  {
    id: 'credit_card',
    label: 'Credit Card',
  },
  {
    id: 'debit_card',
    label: 'Debit Card',
  },
  {
    id: 'mobile_money',
    label: 'Mobile Money',
  },
  {
    id: 'cash',
    label: 'Cash on Delivery',
  },
];

interface PaymentTypeSelectorProps {
  selectedPaymentType: string;
  onSelectPaymentType: (paymentType: string) => void;
}

const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({
  selectedPaymentType,
  onSelectPaymentType,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
      </View>
      <View style={styles.paymentTypesContainer}>
        {paymentTypes.map(paymentType => (
          <TouchableOpacity
            key={paymentType.id}
            style={[
              styles.paymentTypeItem,
              selectedPaymentType === paymentType.id &&
                styles.selectedPaymentTypeItem,
            ]}
            onPress={() => onSelectPaymentType(paymentType.id)}>
            <View style={styles.radioButton}>
              {selectedPaymentType === paymentType.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Text
              style={[
                styles.paymentTypeText,
                selectedPaymentType === paymentType.id &&
                  styles.selectedPaymentTypeText,
              ]}>
              {paymentType.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  sectionTitleContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  paymentTypesContainer: {
    paddingHorizontal: 16,
  },
  paymentTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedPaymentTypeItem: {
    backgroundColor: '#FFF0EC',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999999',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF5722',
  },
  paymentTypeText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedPaymentTypeText: {
    fontWeight: '500',
  },
});

export default PaymentTypeSelector;
