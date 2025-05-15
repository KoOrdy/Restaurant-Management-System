import { Button, Popup } from "../../../../components/ui";
import { useManageTables } from "../../../../hooks/manager/tablesHooks";

const DeleteTablePopup = ({ isOpen, handleClose, tableId }) => {
  const { deleteTable, isDeleting } = useManageTables();

  const handleConfirmDelete = () => {
    deleteTable(tableId, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Delete Table"
      description="Are you sure you want to delete this table? This action cannot be undone."
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

export default DeleteTablePopup;
