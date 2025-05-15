import { Button, Popup } from "../../../components/ui";
import { useManageCustomerOrders } from "../../../hooks/customer/useOrderHook";

const CancelOrderPopup = ({ isOpen, handleClose, orderId }) => {
  const { cancelOrder, isCancellingOrder } = useManageCustomerOrders();

  const handleConfirmCancel = () => {
    cancelOrder(orderId, {
      onSuccess: () => {
        handleClose();
      }
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Cancel Order"
      description="Are you sure you want to cancel this order? This action cannot be undone."
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
          Close
        </Button>
        <Button
          type="button"
          variant="danger"
          fullWidth={true}
          onClick={handleConfirmCancel}
          isLoading={isCancellingOrder}
        >
          Cancel Order
        </Button>
      </div>
    </Popup>
  );
};

export default CancelOrderPopup;
