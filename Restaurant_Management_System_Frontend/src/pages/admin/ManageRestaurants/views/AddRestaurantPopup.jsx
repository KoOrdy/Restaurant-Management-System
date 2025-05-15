import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, InputErrorMessage, Label, Popup } from "../../../../components/ui";
import { useManageRestaurants } from "../../../../hooks/admin/useRestaurantHook";
import { getRestaurantSchema } from "../../../../validation/RestaurantSchema";

const AddRestaurantPopup = ({ isOpen, handleClose }) => {
  const {
    register,
    handleSubmit: formSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getRestaurantSchema(false)),
    mode: "onChange", // Trigger validation on field change

  });

  const { addRestaurant, isAdding } = useManageRestaurants();

  const onSubmit = (data) => {
    addRestaurant(
      { 
        name: data.name, 
        description: data.description, 
        location: data.location,
        managerName: data.managerName, 
        managerEmail: data.managerEmail, 
        password: data.password,
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
      title="Add New Restaurant"
      description="Please enter the details of the new restaurant."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={formSubmit(onSubmit)}>
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

        <Field>
          <Label>Manager Name</Label>
          <Input
            {...register("managerName")}
            isError={!!errors["managerName"]}
            type="text"
            placeholder="Manager Name"
          />
          {errors.managerName && <InputErrorMessage>{errors.managerName.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Manager Email</Label>
          <Input
            {...register("managerEmail")}
            isError={!!errors["managerEmail"]}
            type="email"
            placeholder="Manager Email"
          />
          {errors.managerEmail && <InputErrorMessage>{errors.managerEmail.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Password</Label>
          <Input
            {...register("password")}
            isError={!!errors["password"]}
            type="password"
            placeholder="Password"
          />
          {errors.password && <InputErrorMessage>{errors.password.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Confirm Password</Label>
          <Input
            {...register("confirmPassword")}
            isError={!!errors["confirmPassword"]}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <InputErrorMessage>{errors.confirmPassword.message}</InputErrorMessage>}
        </Field>

        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" fullWidth={true} isLoading={isAdding}>
            Add Restaurant
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default AddRestaurantPopup;
