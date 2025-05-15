import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, InputErrorMessage, Label, Popup } from "../../../../components/ui";
import { userSchema } from "../../../../validation/userSchema";
import { useManageUsers } from "../../../../hooks/admin/useUserHook";
import { useEffect } from "react"; // NEW

const EditUserPopup = ({ isOpen, handleClose, defaultValues }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
    },
    mode: "onChange", // Trigger validation on field change

  });

  const { updateUser, isUpdating } = useManageUsers();

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        email: defaultValues.email,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    updateUser(
      { id: defaultValues.id, name: data.name, email: data.email },
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
      title="Edit User"
      description="Update the user's information."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label>Name</Label>
          <Input
            {...register("name")}
            isError={!!errors.name}
            type="text"
            placeholder="User Name"
          />
          {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Email</Label>
          <Input
            {...register("email")}
            isError={!!errors.email}
            type="email"
            placeholder="User Email"
          />
          {errors.email && <InputErrorMessage>{errors.email.message}</InputErrorMessage>}
        </Field>

        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" fullWidth isLoading={isUpdating}>
            Save
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default EditUserPopup;
