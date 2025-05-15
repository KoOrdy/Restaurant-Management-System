import React from 'react';
import { useManageManagerReservations } from '../../../../hooks/manager/useReservationsHook';
import { Button, Popup } from '../../../../components/ui';

const ApproveRejectReservationPopup = ({ isOpen, handleClose, reservationId }) => {
  const {
    acceptReservation,
    rejectReservation,
    isAccepting,
    isRejecting,
  } = useManageManagerReservations();

  const handleAccept = () => {
    acceptReservation(reservationId, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const handleReject = () => {
    rejectReservation(reservationId, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Accept/Reject Reservation"
      description="Do you want to accept or reject this reservation?"
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth onClick={handleClose}>
          Close
        </Button>
        <Button
          type="button"
          variant="success"
          fullWidth
          onClick={handleAccept}
          isLoading={isAccepting}
        >
          Accept
        </Button>
        <Button
          type="button"
          fullWidth
          onClick={handleReject}
          isLoading={isRejecting}
          variant="danger"
        >
          Reject
        </Button>
      </div>
    </Popup>
  );
};

export default ApproveRejectReservationPopup;
