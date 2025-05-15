import { useForm } from "react-hook-form";
import { Button, Field, Label, Popup, InputErrorMessage, SelectBox } from "../../../../components/ui";
import { useManageOrders } from "../../../../hooks/manager/useOrdersHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderStatusSchema } from "../../../../validation/orderStatusSchema";

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Preparing", value: "Preparing" },
  { label: "Ready", value: "Ready" },
  { label: "Delivered", value: "Delivered" },
];

const ChangeOrderStatusPopup = ({ isOpen, handleClose, orderId, currentStatus }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(orderStatusSchema),
    defaultValues: { newStatus: currentStatus },
  });

  const { updateOrderStatus, isUpdating } = useManageOrders();

  const onSubmit = (data) => {
    updateOrderStatus(
      { orderId, newStatus: data.newStatus },
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
      title="Change Order Status"
      description="Select a new status for this order."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label>New Status</Label>
          <SelectBox
            {...register("newStatus")}
            defaultValue={currentStatus}
            isError={!!errors["newStatus"]}
          >
            <option value="" disabled>
              Select a status
            </option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectBox>

          {errors.newStatus && <InputErrorMessage>{errors.newStatus.message}</InputErrorMessage>}
        </Field>

        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" fullWidth={true} isLoading={isUpdating}>
            Update
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default ChangeOrderStatusPopup;
