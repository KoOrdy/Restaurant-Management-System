import { Button, Popup } from "../../../../components/ui";
import { useManageRestaurants } from "../../../../hooks/admin/useRestaurantHook";

const DeleteRestaurantPopup = ({ isOpen, handleClose, restaurantId }) => {
  const { deleteRestaurant, isDeleting } = useManageRestaurants();

  const handleConfirmDelete = () => {
    deleteRestaurant(restaurantId, {
      onSuccess: () => {
        handleClose();
      }
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Delete Restaurant"
      description="Are you sure you want to delete this restaurant? This action cannot be undone."
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
          Close
        </Button>
        <Button
          type="button"
          fullWidth={true}
          onClick={handleConfirmDelete}
          variant="danger"
          isLoading={isDeleting}
        >
          Delete
        </Button>
      </div>
    </Popup>
  );
};

export default DeleteRestaurantPopup;
