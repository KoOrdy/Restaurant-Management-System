import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { menuItemSchema } from "../../../../validation/menuItemSchema";
import { Button, Field, Input, InputErrorMessage, Label, Popup, SelectBox, Textarea } from "../../../../components/ui";
import { useGetAllCategories } from "../../../../hooks/admin/useCategoryHook";
import { useManageMenuItems } from "../../../../hooks/manager/menuItemsHooks";

const AddMenuItemPopup = ({ isOpen, handleClose }) => {
  const { register, handleSubmit: formSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(menuItemSchema),
    mode: "onChange",
  });

  const { addMenuItem, isAdding } = useManageMenuItems();
  const { categories, isLoading: isLoadingCategories } = useGetAllCategories();

  const onSubmit = (data) => {
    addMenuItem(
      {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        availability: data.availability,
        categoryId: parseInt(data.categoryId),
      },
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
      title="Add New Menu Item"
      description="Please enter details for the new menu item."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={formSubmit(onSubmit)}>
        <Field>
          <Label>Name</Label>
          <Input
            {...register("name")}
            isError={!!errors["name"]}
            placeholder="Menu item name"
          />
          {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            isError={!!errors["description"]}
            placeholder="Menu item description"
            rows={4}
          />
          {errors.description && <InputErrorMessage>{errors.description.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Price</Label>
          <Input
            {...register("price")}
            isError={!!errors["price"]}
            type="number"
            step="0.01"
            placeholder="0.00"
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
          <Button type="submit" fullWidth={true} isLoading={isAdding}>
            Add
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default AddMenuItemPopup;
