
import { useForm } from "react-hook-form";
import { Button, Field, FormHeading, Input, InputErrorMessage, Label } from "../../components/ui";
import { loginSchema } from "../../validation/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAction } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Create the navigate function from React Router
  const { loading, userId } = useSelector((state) => state.auth);  // Accessing auth state from Redux

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange"
  });

  const onSubmit = (request) => {
    dispatch(loginAction({ email: request.email, password: request.password }));
  };

  useEffect(() => {
    // Navigate when the user is logged in
    if (userId) {
      navigate("/"); // Navigate to the home page if logged in
    }
  }, [userId, navigate]); // Depend on isLoggedIn to trigger navigation


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
      <FormHeading>Login to Restaurant</FormHeading>

      <Field>
        <Label>Email</Label>
        <Input
          {...register("email")}
          isError={!!errors["email"]}
          type="email"
          placeholder="Enter your email"
        />
        {errors.email && <InputErrorMessage>{errors.email.message}</InputErrorMessage>}
      </Field>

      <Field>
        <Label>Password</Label>
        <Input
          {...register("password")}
          isError={!!errors["password"]}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && <InputErrorMessage>{errors.password.message}</InputErrorMessage>}
      </Field>

      <Button size={"md"} fullWidth type="submit" isLoading={loading}>
        Login
      </Button>
    </form>
  );
};

export default Login;
