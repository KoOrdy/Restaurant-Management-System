import React from 'react';
import { useManageRestaurants } from '../../../../hooks/admin/useRestaurantHook';
import { Button, Popup } from '../../../../components/ui';

const ApproveRejectRestaurantPopup = ({ isOpen, handleClose, restaurantId }) => {
  const { approveRestaurant, rejectRestaurant, isApproving, isRejecting } = useManageRestaurants();

  const handleApprove = () => {
    approveRestaurant(restaurantId, {
      onSuccess: () => {
        handleClose();
      }
    });
  };

  const handleReject = () => {
    rejectRestaurant(restaurantId, {
      onSuccess: () => {
        handleClose();
      }
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Approve/Reject Restaurant"
      description="Do you want to approve or reject this restaurant?"
    >
      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
          Close
        </Button>
        <Button
          type="button"
          variant="success"
          fullWidth={true}
          onClick={handleApprove}
          isLoading={isApproving}
        >
          Approve
        </Button>
        <Button
          type="button"
          fullWidth={true}
          onClick={handleReject}
          variant="danger"
          isLoading={isRejecting}
        >
          Reject
        </Button>
      </div>
    </Popup>
  );
};

export default ApproveRejectRestaurantPopup;
