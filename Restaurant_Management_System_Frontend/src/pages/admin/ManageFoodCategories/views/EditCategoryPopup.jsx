import { useForm } from "react-hook-form";
import { categorySchema } from "../../../../validation/categorySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, InputErrorMessage, Label, Popup } from "../../../../components/ui";
import { useManageCategories } from "../../../../hooks/admin/useCategoryHook";
import { useEffect } from "react";

const EditCategoryPopup = ({ isOpen, handleClose, defaultValues }) => {
  const { register, handleSubmit: formSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || ""
    },
    mode: "onChange", // Trigger validation on field change
  });

  const { updateCategory, isUpdating } = useManageCategories();

  const onSubmit = (data) => {
    updateCategory(
      { id: defaultValues.id, name: data.name },
      {
        onSuccess: () => {
          reset();
          handleClose();
        },
      }
    );
  };

  // Update form values when popup opens with new data
  useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues.name);
    }
  }, [defaultValues, setValue]);

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Edit Category"
      description="Update the name of the category."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={formSubmit(onSubmit)}>
        <Field>
          <Label>Category Name</Label>
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
          <Button type="submit" fullWidth={true} isLoading={isUpdating}>
            Save
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default EditCategoryPopup;
