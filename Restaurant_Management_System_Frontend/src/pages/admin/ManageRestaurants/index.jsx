import React, { useState, useMemo } from 'react';
import { ActionCard, Button, CountCard, Header, Input, SectionHeader, StatusBadge, Table, TableCell, TableRow } from '../../../components/ui';
import { CirclePlus, Home, Edit, Search, TrashIcon, ArrowDownUp, Wrench, Eye, Utensils, Apple } from 'lucide-react';
import { useGetAllRestaurants } from '../../../hooks/admin/useRestaurantHook';
import { AddRestaurantPopup, DeleteRestaurantPopup, ShowRestaurantPopup, ApproveRejectRestaurantPopup, EditRestaurantPopup } from './views';
import { NavLink } from 'react-router';

const ManageRestaurants = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // New state for edit popup
  const [isShowPopupOpen, setIsShowPopupOpen] = useState(false);
  const [isApproveRejectPopupOpen, setIsApproveRejectPopupOpen] = useState(false); // New state for approve/reject popup

  const [selectedID, setSelectedID] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // New state for the selected restaurant to edit

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const { restaurants } = useGetAllRestaurants();

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = restaurants;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortAsc) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    return filtered;
  }, [restaurants, searchTerm, sortAsc]);

  // Extracted onClick handlers
  const handleShowPopup = (restaurantId) => {
    setIsShowPopupOpen(true);
    setSelectedID(restaurantId);
  };

  const handleEditPopup = (restaurant) => {
    setIsEditPopupOpen(true);
    setSelectedRestaurant(restaurant);
  };

  const handleDeletePopup = (restaurantId) => {
    setIsDeletePopupOpen(true);
    setSelectedID(restaurantId);
  };

  const handleApproveRejectPopup = (restaurantId) => {
    setIsApproveRejectPopupOpen(true);
    setSelectedID(restaurantId);
  };

  const handleSortToggle = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <div className="sm:p-5 p-3 space-y-5">
      <Header heading="Manage Restaurants" subtitle="Add, edit, or delete restaurants for your system." />
      
      <div className="space-y-5 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <CountCard 
          title="Total Restaurants"
          description="Current active restaurants"
          count={restaurants.length}
          icon={<Home />}
        />
        <ActionCard
          icon={<CirclePlus />}
          iconBgColor="bg-green-600"
          iconColor="text-[#ffffff]"
          title="Add New Restaurant"
          description="Click the button below to add a new restaurant"
        >
          <Button fullWidth onClick={() => setIsAddPopupOpen(true)} variant='success'>
            Add Restaurant
          </Button>
        </ActionCard>
      </div>

      <div className="bg-white shadow-md space-y-5 p-5 rounded-lg">
        <SectionHeader title="Manage Restaurants" description="Here you can view and manage all restaurants." />

        {/* Search and Sort controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center w-full sm:w-1/2">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="text-gray-400" />}
            />
          </div>

          <Button
            variant="outline"
            onClick={handleSortToggle}  // Toggling sort direction
            icon={<ArrowDownUp />}
          >
            Sort ({sortAsc ? "Asc" : "Desc"})
          </Button>
        </div>

        <div className="w-full overflow-x-auto">
          <Table columns={["#ID", "Name", "Manager", "Location", "Status", "Action"]}>
            {filteredAndSortedRestaurants.length > 0 ? (
              filteredAndSortedRestaurants.map((restaurant, index) => (
                <TableRow key={index}>
                  <TableCell>{restaurant.id}</TableCell>
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>{restaurant.managerName}</TableCell>
                  <TableCell>{restaurant.location}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      variant={
                        restaurant.status === 'Approved' ? 'success' :
                        restaurant.status === 'Rejected' ? 'error' :
                        'info' // for Pending
                      }
                      shape="rounded"
                    >
                      {restaurant.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className='flex gap-3'>
                    <Button 
                      size='sm' 
                      variant='success' 
                      icon={<Eye className='w-full h-full' />} 
                      onClick={() => handleShowPopup(restaurant.id)} // Show restaurant details on click
                    />
                    <NavLink to={`/admin/reservations/${restaurant.id}`}>
                      <Button 
                        size='sm' 
                        variant='secondary' 
                        icon={<Utensils className='w-full h-full' />} 
                      />
                    </NavLink>
                    <NavLink to={`/admin/orders/${restaurant.id}`}>
                      <Button 
                        size='sm' 
                        variant='cancel' 
                        icon={<Apple  className='w-full h-full' />} 
                      />
                    </NavLink>
                    <Button 
                      size='sm' 
                      variant='info' 
                      icon={<Edit className='w-full h-full' />} 
                      onClick={() => handleEditPopup(restaurant)} // Edit restaurant
                    />
                    <Button 
                      variant="danger"
                      size='sm' 
                      icon={<TrashIcon className='w-full h-full' />} 
                      onClick={() => handleDeletePopup(restaurant.id)} // Delete restaurant action
                    />
                    {restaurant.status === "Pending" && 
                      <Button 
                        size='sm' 
                        variant='secondary'
                        icon={<Wrench className="w-full h-full" />}  
                        onClick={() => handleApproveRejectPopup(restaurant.id)} // Open approve/reject popup
                      />
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No restaurants found.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>

      {/* Popups */}
      <AddRestaurantPopup
        isOpen={isAddPopupOpen}
        handleClose={() => setIsAddPopupOpen(false)}
      />
      <DeleteRestaurantPopup
        isOpen={isDeletePopupOpen}
        handleClose={() => setIsDeletePopupOpen(false)}
        restaurantId={selectedID}
      />
      <ShowRestaurantPopup
        isOpen={isShowPopupOpen}
        handleClose={() => setIsShowPopupOpen(false)}
        restaurantId={selectedID}
      />
      {/* Edit Restaurant Popup */}
      <EditRestaurantPopup
        isOpen={isEditPopupOpen}
        handleClose={() => setIsEditPopupOpen(false)}
        restaurant={selectedRestaurant}
      />
      {/* Approve/Reject Popup */}
      <ApproveRejectRestaurantPopup
        isOpen={isApproveRejectPopupOpen}
        handleClose={() => setIsApproveRejectPopupOpen(false)}
        restaurantId={selectedID}
      />
    </div>
  );
};

export default ManageRestaurants;
