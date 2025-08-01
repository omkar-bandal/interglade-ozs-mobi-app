import Button from '@components/ui/Button';
import {useUpdateServiceReservation} from '@hooks/api/reservation-service.rq';
import {SPACING} from '@theme/constants';
import darkTheme from '@theme/light';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Confirm = ({id}: {id: string}) => {
  const {mutateAsync: confirmReservation, isPending} =
    useUpdateServiceReservation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = async () => {
    try {
      await confirmReservation({
        reservation: {status: 'confirmed'},
        reservationId: id,
      });
      //Alert.alert('Booking Confirmed');
      setModalVisible(false);
    } catch (error) {
      console.log('Error confirming reservation:', error);
    }
  };

  return (
    <View>
      <Button
        style={{flex: 1, width: '80%'}}
        label="Confirm"
        onPress={() => setModalVisible(true)}
        loading={isPending}
        disabled={isPending}
        variant="success"
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.title}>
              Are you sure you want to confrim your booking?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleConfirm}>
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: darkTheme.colors.background,
    position: 'absolute',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    height: '20%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B1B1B',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  noButton: {
    backgroundColor: darkTheme.colors.lightGray,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  noText: {
    color: darkTheme.colors.textButton,
    fontWeight: '600',
  },
  yesButton: {
    backgroundColor: darkTheme.colors.primaryDark,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  yesText: {
    color: '#fff',
    fontWeight: '600',
  },
});
