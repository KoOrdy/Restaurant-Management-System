import { Button, Popup } from "../../../../components/ui";
import { useManageCategories } from "../../../../hooks/admin/useCategoryHook";

const DeleteCategoryPopup = ({ isOpen, handleClose, categoryId }) => {
  const { deleteCategory, isDeleting } = useManageCategories();

  const handleConfirmDelete = () => {
    deleteCategory(categoryId, {
      onSuccess: () => {
        handleClose();
      }
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Delete Category"
      description="Are you sure you want to delete this category? This action cannot be undone."
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

export default DeleteCategoryPopup;
