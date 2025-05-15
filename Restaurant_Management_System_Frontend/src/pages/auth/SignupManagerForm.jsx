import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Field,
  FormHeading,
  Input,
  InputErrorMessage,
  Label,
  Textarea,
} from "../../components/ui";
import { signupManagerSchema } from "../../validation/signupManagerSchema";
import { useForm } from "react-hook-form";
import { registerManagerService } from "../../services/auth.services";
import { showToast } from "../../utils/";
import { useNavigate } from "react-router";

const SignupManagerForm = () => {
  const navigate = useNavigate();  // Create the navigate function from React Router

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupManagerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerManagerService(
        data.name, 
        data.description, 
        data.location,
        data.managerName,
        data.managerEmail,
      );
      if (response.status === 202) {
        showToast("success", "User registered successfully.");
        navigate("/login");
      }
    } catch (error) {
      if (error.data?.errors && Array.isArray(error.data.errors)) {
        error.data.errors.forEach((err) => {
          showToast("error", err);
        });
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form className="w-full max-w-3xl space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading>Create a Restaurant Manager Account</FormHeading>

      {/* Restaurant Name */}
      <Field>
        <Label>Restaurant Name</Label>
        <Input
          {...register("name")}
          isError={!!errors.name}
          placeholder="Enter your restaurant's name"
        />
        {errors.name && (
          <InputErrorMessage>{errors.name.message}</InputErrorMessage>
        )}
      </Field>

      {/* Location (Textarea) */}
      <Field>
        <Label>Location</Label>
        <Textarea
          {...register("location")}
          isError={!!errors.location}
          placeholder="Enter the restaurant location"
          rows={2}
        />
        {errors.location && (
          <InputErrorMessage>{errors.location.message}</InputErrorMessage>
        )}
      </Field>

      {/* Description (Textarea) */}
      <Field>
        <Label>Description</Label>
        <Textarea
          {...register("description")}
          isError={!!errors.description}
          placeholder="Write a short description"
          rows={3}
        />
        {errors.description && (
          <InputErrorMessage>{errors.description.message}</InputErrorMessage>
        )}
      </Field>

      {/* Manager Name + Manager Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <Label>Manager Name</Label>
          <Input
            {...register("managerName")}
            isError={!!errors.managerName}
            placeholder="Enter manager full name"
          />
          {errors.managerName && (
            <InputErrorMessage>{errors.managerName.message}</InputErrorMessage>
          )}
        </Field>

        <Field>
          <Label>Manager Email</Label>
          <Input
            {...register("managerEmail")}
            isError={!!errors.managerEmail}
            type="email"
            placeholder="Enter manager email"
          />
          {errors.managerEmail && (
            <InputErrorMessage>{errors.managerEmail.message}</InputErrorMessage>
          )}
        </Field>
      </div>
      
      {/* Submit */}
      <Button size="md" fullWidth>
        Sign Up
      </Button>
    </form>
  );
};

export default SignupManagerForm;
