import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Button, Field, Input, InputErrorMessage, Label, Popup, SelectBox } from "../../../../components/ui";
import { useManageMenuItems } from "../../../../hooks/manager/menuItemsHooks";
import { menuItemSchema } from "../../../../validation/menuItemSchema";
import { useGetAllCategories } from "../../../../hooks/admin/useCategoryHook";
import UploadMenuItemPhoto from "./UploadMenuItemPhoto";

const EditMenuItemPopup = ({ isOpen, handleClose, defaultValues }) => {
  const { register, handleSubmit: formSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(menuItemSchema),
    defaultValues,
    mode: "onChange",
  });

  console.log(defaultValues);
  

  const { updateMenuItem, isUpdating } = useManageMenuItems();
  const { categories, isLoading: isLoadingCategories } = useGetAllCategories();

  const onSubmit = (data) => {
    updateMenuItem(
      {
        id: defaultValues.id,
        ...data,
        price: parseFloat(data.price), // Ensure price is a number
        categoryId: parseInt(data.categoryId),
        availability: data.availability,
      },
      {
        onSuccess: () => {
          reset();
          handleClose();
        },
      }
    );
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Edit Menu Item"
      description="Update the details of the menu item."
    >
      <UploadMenuItemPhoto menuItemId={defaultValues?.id} />

      <form className="flex flex-col space-y-3 mt-4" onSubmit={formSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold">Upload Menu Item Details</h2>
        <Field>
          <Label>Name</Label>
          <Input
            {...register("name")}
            isError={!!errors.name}
            placeholder="Menu Item Name"
          />
          {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Description</Label>
          <Input
            {...register("description")}
            isError={!!errors.description}
            placeholder="Description"
          />
          {errors.description && <InputErrorMessage>{errors.description.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Price</Label>
          <Input
            {...register("price")}
            type="number"
            isError={!!errors.price}
            placeholder="Price"
          />
          {errors.price && <InputErrorMessage>{errors.price.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Availability</Label>
          <SelectBox {...register("availability")} isError={!!errors["availability"]}>
            <option value="">Select availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </SelectBox>
          {errors.availability && <InputErrorMessage>{errors.availability.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Category</Label>
          <SelectBox {...register("categoryId")} isError={!!errors["categoryId"]} disabled={isLoadingCategories}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </SelectBox>
          {errors.categoryId && <InputErrorMessage>{errors.categoryId.message}</InputErrorMessage>}
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

export default EditMenuItemPopup;
