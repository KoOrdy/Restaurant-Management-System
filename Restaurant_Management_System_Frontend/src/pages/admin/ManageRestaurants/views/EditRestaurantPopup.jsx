import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, InputErrorMessage, Label, Popup } from "../../../../components/ui";
import { useManageRestaurants } from "../../../../hooks/admin/useRestaurantHook";
import { getRestaurantSchema } from "../../../../validation/RestaurantSchema";
import UploadRestaurantPhoto from "./UploadRestaurantPhoto";

const EditRestaurantPopup = ({ isOpen, handleClose, restaurant }) => {
  const {
    register,
    handleSubmit: formSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getRestaurantSchema(true)), // Pass `true` for update
    mode: "onChange", // Trigger validation on field change
  });

  console.log(restaurant?.id);
  

  const { updateRestaurant, isUpdating } = useManageRestaurants();

  // Reset form values when restaurant data changes
  useEffect(() => {
    if (restaurant) {
      reset({
        name: restaurant.name || "",
        location: restaurant.location || "",
        description: restaurant.description || "",
      });
    }
  }, [restaurant, reset]);


  const onSubmit = (data) => {
    updateRestaurant(
      { 
        id: restaurant.id, // Ensure you're passing the restaurant's ID
        name: data.name, 
        description: data.description, 
        location: data.location,
      },
      {
        onSuccess: () => {
          reset(); // Reset the form after successful update
          handleClose();
        },
      }
    );
  };


  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Edit Restaurant"
      description="Please update the restaurant details."
    >
      <UploadRestaurantPhoto restaurantId={restaurant?.id} />

      <form className="flex flex-col space-y-4 mt-4" onSubmit={formSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold">Upload Restaurant Details</h2>
        <Field>
          <Label>Restaurant Name</Label>
          <Input
            {...register("name")}
            isError={!!errors["name"]}
            type="text"
            placeholder="Restaurant Name"
          />
          {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Location</Label>
          <Input
            {...register("location")}
            isError={!!errors["location"]}
            type="text"
            placeholder="Restaurant Location"
          />
          {errors.location && <InputErrorMessage>{errors.location.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Description</Label>
          <Input
            {...register("description")}
            isError={!!errors["description"]}
            type="text"
            placeholder="Restaurant Description"
          />
          {errors.description && <InputErrorMessage>{errors.description.message}</InputErrorMessage>}
        </Field>

        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" fullWidth={true} isLoading={isUpdating}>
            Update Restaurant
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default EditRestaurantPopup;
