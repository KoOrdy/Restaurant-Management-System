import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import SignupManagerForm from "./SignupManagerForm";
import ChooseAccount from "./ChooseAccount";
import SignupCustomerForm from "./SignupCustomerForm";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  // Optional: Redirect if no valid role
  useEffect(() => {
    if (!["customer", "manager"].includes(role)) {
      navigate("/choose-account"); // or show an error message
    }
  }, [role, navigate]);

  return (
    <>
      {!role ? <ChooseAccount /> : null}

      {role === "customer" && (
        <SignupCustomerForm />
      )}

      {role === "manager" && (
        <SignupManagerForm />
      )}
    </>
  );
};

export default Register;
