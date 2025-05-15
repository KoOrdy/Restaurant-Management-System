import { Button, Popup } from "../../../components/ui";
import { useManageReservations } from "../../../hooks/customer/useReservationHook";

const DeleteReservationPopup = ({ isOpen, handleClose, reservationId }) => {
  const { deleteReservation, isDeleting } = useManageReservations();

  const handleConfirmDelete = () => {
    deleteReservation(reservationId, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Delete Reservation"
      description="Are you sure you want to delete this reservation? This action cannot be undone."
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
          Close
        </Button>
        <Button
          type="button"
          fullWidth={true}
          onClick={handleConfirmDelete}
          isLoading={isDeleting}
        >
          Delete
        </Button>
      </div>
    </Popup>
  );
};

export default DeleteReservationPopup;
