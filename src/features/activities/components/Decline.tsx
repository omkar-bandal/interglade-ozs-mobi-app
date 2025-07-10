import Button from '@components/ui/Button';
import {useUpdateReservation} from '@hooks/api/reservation.rq';
import {SPACING} from '@theme/constants';
import darkTheme from '@theme/light';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Decline = ({id}: {id: string}) => {
  const {mutateAsync: declineReservation, isPending} = useUpdateReservation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDecline = async () => {
    try {
      await declineReservation({
        reservation: {status: 'cancelled'},
        reservationId: id,
      });
    } catch (error) {
      console.log('Error Declineing reservation:', error);
    }
  };

  return (
    <View>
      <Button
        style={{flex: 1, width: '80%'}}
        label="Decline"
        onPress={() => setModalVisible(true)}
        loading={isPending}
        disabled={isPending}
        variant="destructive"
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.title}>
              Are You Sure You Want To Cancel your booking?
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleDecline}>
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Decline;

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
