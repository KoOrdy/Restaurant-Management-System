import { Button, Popup } from "../../../../components/ui";
import { useManageMenuItems } from "../../../../hooks/manager/menuItemsHooks";

const DeleteMenuItemPopup = ({ isOpen, handleClose, menuItemId }) => {
  const { deleteMenuItem, isDeleting } = useManageMenuItems();

  const handleConfirmDelete = () => {
    deleteMenuItem(menuItemId, {
      onSuccess: () => {
        handleClose();
      }
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Delete Menu Item"
      description="Are you sure you want to delete this menu item? This action cannot be undone."
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
          Close
        </Button>
        <Button
          type="button"
          variant="danger"
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

export default DeleteMenuItemPopup;
