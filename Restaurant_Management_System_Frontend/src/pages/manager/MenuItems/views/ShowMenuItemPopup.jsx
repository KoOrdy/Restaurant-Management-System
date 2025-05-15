import { Button, Popup, StatusBadge } from "../../../../components/ui";
import { useGetMenuItemById } from "../../../../hooks/manager/menuItemsHooks";

const ShowMenuItemPopup = ({ isOpen, handleClose, menuItemId }) => {
  const { menuItem } = useGetMenuItemById(menuItemId);
  
  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Menu Item Details"
      description="Here are the details of the menu item."
    >
      {/* Menu Item Details */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={menuItem?.imageUrl || "/default-image.webp"}
            alt="Menu Item"
            className="w-64 h-40 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Information */}
        <div className="mt-6 space-y-4 divide-y divide-gray-300">
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">ID</span>
            <span className="text-gray-900 font-semibold">{menuItem?.id}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Name</span>
            <span className="text-gray-900 font-semibold">{menuItem?.name}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Description</span>
            <span className="text-gray-900 font-semibold">{menuItem?.description}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Price</span>
            <span className="text-gray-900 font-semibold">${menuItem?.price?.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Category ID</span>
            <span className="text-gray-900 font-semibold">{menuItem?.category}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="font-medium text-gray-600">Availability</span>
            <StatusBadge
              variant={menuItem?.availability ? "success" : "error"}
              shape="rounded"
            >
              {menuItem?.availability ? "Available" : "Not Available"}
            </StatusBadge>
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

export default ShowMenuItemPopup;
