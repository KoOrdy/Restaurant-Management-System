import { Button, Popup } from "../../../../components/ui";
import { useManageManagerReservations } from "../../../../hooks/manager/useReservationsHook";

const MarkFinishedPopup = ({ isOpen, handleClose }) => {
  const { MarkAllReservationsFinished, isFinishing } = useManageManagerReservations();

  const handleConfirmMark = () => {
    MarkAllReservationsFinished(undefined, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Mark All Past Reservations as Finished"
      description="Are you sure you want to mark all past reservations as finished? This action cannot be undone."
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth onClick={handleClose}>
          Close
        </Button>
        <Button
          type="button"
          variant="warning"
          fullWidth
          onClick={handleConfirmMark}
          isLoading={isFinishing}
        >
          Mark as Finished
        </Button>
      </div>
    </Popup>
  );
};

export default MarkFinishedPopup;
