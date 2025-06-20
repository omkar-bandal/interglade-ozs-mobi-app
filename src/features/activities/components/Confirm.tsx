import Button from '@components/ui/Button';
import {useUpdateReservation} from '@hooks/api/reservation.rq';
import React from 'react';

const Confirm = ({id}: {id: string}) => {
  const {mutateAsync: confirmReservation, isPending} = useUpdateReservation();

  const handleConfirm = async () => {
    try {
      await confirmReservation({
        reservation: {status: 'confirmed'},
        reservationId: id,
      });
    } catch (error) {
      console.log('Error confirming reservation:', error);
    }
  };

  return (
    <Button
      style={{flex: 1}}
      label="Confirm"
      onPress={handleConfirm}
      loading={isPending}
      disabled={isPending}
      variant="success"
    />
  );
};

export default Confirm;
