import { Store, User } from "lucide-react";
import { FutureCard } from "../../components/ui";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const ChooseAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  useEffect(() => {
    if (role && ["customer", "manager"].includes(role)) {
      navigate(`/choose-account?role=${role}`);
    }
  }, [role, navigate]);

  const handleSelect = (selectedRole) => {
    navigate(`/choose-account?role=${selectedRole}`);
  };

  return (
    <div className="w-full max-w-md space-y-6 mx-auto p-6">
      <div onClick={() => handleSelect("customer")} className="cursor-pointer">
        <FutureCard
          icon={<User className="text-[#1f1f23] w-10 h-10" />}
          title="I'm a Customer"
          description="Book a table at your favorite restaurant in just a few clicks."
        />
      </div>
      <div onClick={() => handleSelect("manager")} className="cursor-pointer">
        <FutureCard
          icon={<Store className="text-[#1f1f23] w-10 h-10" />}
          title="I'm a Restaurant Manager"
          description="Manage your restaurant profile, bookings, and customers."
        />
      </div>
    </div>
  );
};

export default ChooseAccount;
