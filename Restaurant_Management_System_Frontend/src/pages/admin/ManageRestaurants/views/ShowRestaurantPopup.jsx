import { Button, Popup, StatusBadge } from "../../../../components/ui";
import { useGetRestaurantById } from "../../../../hooks/admin/useRestaurantHook";

const ShowRestaurantPopup = ({ isOpen, handleClose, restaurantId }) => {
  const { restaurant } = useGetRestaurantById(restaurantId);
  
  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Restaurant Details"
      description="Here are the details of the restaurant."
    >
      {/* Restaurant Details */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg">

        {/* Image at Top */}
        <div className="flex justify-center mb-6">
          <img
            src={restaurant?.imageUrl || "/default-image.webp"}
            alt="Restaurant"
            className="w-64 h-40 object-cover rounded-lg shadow-md"
          />
        </div>
    
        {/* Restaurant Information */}
        <div className="mt-6 space-y-4 divide-y divide-gray-300">
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">ID</span>
            <span className="text-gray-900 font-semibold">{restaurant?.id}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Name</span>
            <span className="text-gray-900 font-semibold">{restaurant?.name}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Location</span>
            <span className="text-gray-900 font-semibold">{restaurant?.location}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Status</span>
            <StatusBadge 
              variant={
                restaurant?.status === 'Approved' ? 'success' :
                restaurant?.status === 'Rejected' ? 'error' :
                'info' // for Pending
              }
              shape="rounded"
            >
              {restaurant?.status}
            </StatusBadge>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Manager Name</span>
            <span className="text-gray-900 font-semibold">{restaurant?.managerName}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Manager Email</span>
            <span className="text-gray-900 font-semibold">{restaurant?.managerEmail}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Description</span>
            <span className="text-gray-900 font-semibold">{restaurant?.description}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 mt-4">
        <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
          Close
        </Button>
      </div>
    </Popup>
  );
};

export default ShowRestaurantPopup;
