import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, FormHeading, Input, InputErrorMessage, Label } from "../../components/ui";
import { signupCustomerSchema } from "../../validation/signupCustomerSchema";
import { useForm } from "react-hook-form";
import { registerCustomerService } from "../../services/auth.services";
import { useNavigate } from "react-router";
import { showToast } from "../../utils/";

const SignupCustomerForm = () => {
  const navigate = useNavigate();  // Create the navigate function from React Router

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupCustomerSchema),
    mode: "onChange", // Trigger validation on field change
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerCustomerService(data.name, data.email, data.password);
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
    <>
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormHeading>Create a New Customer Account</FormHeading>

        {/* Name Field */}
        <Field>
          <Label>Name</Label>
          <Input 
            {...register("name")} // Register the input field for 'name'
            isError={!!errors["name"]} // Pass the error state for conditional styling
            type="text"
            placeholder="Enter your full name" 
          />
          {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>} {/* Display error message */}
        </Field>

        {/* Email Field */}
        <Field>
          <Label>Email</Label>
          <Input 
            {...register("email")} // Register the input field for 'email'
            isError={!!errors["email"]} // Pass the error state for conditional styling
            type="email" 
            placeholder="Enter your email"
          />
          {errors.email && <InputErrorMessage>{errors.email.message}</InputErrorMessage>} {/* Display error message */}
        </Field>

        {/* Password Field */}
        <Field>
          <Label>Password</Label>
          <Input 
            {...register("password")} // Register the input field for 'password'
            isError={!!errors["password"]} // Pass the error state for conditional styling
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && <InputErrorMessage>{errors.password.message}</InputErrorMessage>} {/* Display error message */}
        </Field>

        {/* Confirm Password Field */}
        <Field>
          <Label>Confirm Password</Label>
          <Input 
            {...register("confirmPassword")} // Register the input field for 'confirmPassword'
            isError={!!errors["confirmPassword"]} // Pass the error state for conditional styling
            type="password"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <InputErrorMessage>{errors.confirmPassword.message}</InputErrorMessage>} {/* Display error message */}
        </Field>

        {/* Submit Button */}
        <Button size={"md"} fullWidth>
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignupCustomerForm;
