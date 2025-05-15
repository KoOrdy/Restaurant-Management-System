import { Button, Popup } from "../../../../components/ui";
import { useManageUsers } from "../../../../hooks/admin/useUserHook";

const DeleteUserPopup = ({ isOpen, handleClose, userId }) => {
  const { deleteUser, isDeleting } = useManageUsers();

  const handleDelete = () => {
    deleteUser(userId, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Delete User"
      description="Are you sure you want to delete this user? This action cannot be undone."
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          type="button" 
          fullWidth 
          onClick={handleDelete} 
          isLoading={isDeleting}
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </Popup>
  );
};

export default DeleteUserPopup;
