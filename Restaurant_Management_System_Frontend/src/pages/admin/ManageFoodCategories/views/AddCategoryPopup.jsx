import { useForm } from "react-hook-form";
import { categorySchema } from "../../../../validation/categorySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, InputErrorMessage, Label, Popup } from "../../../../components/ui";
import { useManageCategories } from "../../../../hooks/admin/useCategoryHook";

const AddCategoryPopup = ({ isOpen, handleClose }) => {
  const { register, handleSubmit: formSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "onChange", // Trigger validation on field change
  });

  const { addCategory, isAdding } = useManageCategories();

  const onSubmit = (data) => {
    addCategory(
      { name: data.name },
      {
        onSuccess: () => {
          reset();
          handleClose();
        },
      }
    );
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Add New Category"
      description="Please enter the name of the new category."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={formSubmit(onSubmit)}>
        <Field>
          <Label>Category name</Label>
          <Input
            {...register("name")}
            isError={!!errors["name"]}
            type="text"
            placeholder="Category Name"
          />
          {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
        </Field>
        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" fullWidth={true} isLoading={isAdding}>
            Add
          </Button>
        </div>
      </form>
    </Popup>
  )
}

export default AddCategoryPopup;
