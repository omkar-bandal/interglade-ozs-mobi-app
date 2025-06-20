import Button from '@components/ui/Button';
import {useUpdateReservation} from '@hooks/api/reservation.rq';
import React from 'react';

const Decline = ({id}: {id: string}) => {
  const {mutateAsync: declineReservation, isPending} = useUpdateReservation();

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
    <Button
      style={{flex: 1}}
      label="Decline"
      onPress={handleDecline}
      loading={isPending}
      disabled={isPending}
      variant="destructive"
    />
  );
};

export default Decline;
