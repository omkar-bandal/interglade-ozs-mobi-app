import Button from '@components/ui/Button';
import {useUpdateReservation} from '@hooks/api/reservation.rq';
import React from 'react';

const Complete = ({id}: {id: string}) => {
  const {mutateAsync: completeReservation, isPending} = useUpdateReservation();

  const handleComplete = async () => {
    try {
      await completeReservation({
        reservation: {status: 'completed'},
        reservationId: id,
      });
    } catch (error) {
      console.log('Error completing reservation:', error);
    }
  };

  return (
    <Button
      label="Completed"
      onPress={handleComplete}
      loading={isPending}
      disabled={isPending}
      variant="success"
    />
  );
};

export default Complete;
