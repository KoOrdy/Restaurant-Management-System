import React, { useState, useMemo } from 'react';
import {
  ActionCard, Button, CountCard, Header, Input,
  SectionHeader, StatusBadge, Table, TableCell, TableRow
} from '../../../components/ui';
import {
  CirclePlus, Utensils, Edit, Search, TrashIcon, ArrowDownUp,
  Eye
} from 'lucide-react';
import { useGetAllMenuItems } from '../../../hooks/manager/menuItemsHooks';
import { AddMenuItemPopup, DeleteMenuItemPopup, EditMenuItemPopup, ShowMenuItemPopup } from './views';

const ManageMenuItems = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isShowPopupOpen, setIsShowPopupOpen] = useState(false);

  const [selectedID, setSelectedID] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const { menuItems } = useGetAllMenuItems();

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditPopupOpen(true);
  };

    // Extracted onClick handlers
    const handleShowPopup = (menuItemId) => {
      setIsShowPopupOpen(true);
      setSelectedID(menuItemId);
    };
  

  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => sortAsc ? a.id - b.id : b.id - a.id);
    return filtered;
  }, [menuItems, searchTerm, sortAsc]);

  return (
    <div className="sm:p-5 p-3 space-y-5">
      <Header
        heading="Manage Menu Items"
        subtitle="Add, edit, or delete food items from your restaurant's menu."
      />

      <div className="space-y-5 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <CountCard
          title="Total Menu Items"
          description="All available menu items"
          count={menuItems.length}
          icon={<Utensils />}
        />
        <ActionCard
          icon={<CirclePlus />}
          iconBgColor="bg-green-600"
          iconColor="text-white"
          title="Add New Menu Item"
          description="Click the button below to add a new food item"
        >
          <Button fullWidth onClick={() => setIsAddPopupOpen(true)} variant='success'>
            Add Menu Item
          </Button>
        </ActionCard>
      </div>

      <div className="bg-white shadow-md space-y-5 p-5 rounded-lg">
        <SectionHeader title="Manage Menu Items" description="View and manage your food items here." />

        {/* Search and Sort Controls */}
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
            onClick={() => setSortAsc(!sortAsc)}
            icon={<ArrowDownUp />}
          >
            Sort ({sortAsc ? "Asc" : "Desc"})
          </Button>
        </div>

        <div className="w-full overflow-x-auto">
          <Table columns={["#ID", "Name", "Price", "Availability", "Action"]}>
            {filteredAndSortedItems.length > 0 ? (
              filteredAndSortedItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      variant={
                        item.availability ? 'success' : 'error'
                      }
                      shape="rounded"
                    >
                      {item.availability ? "Available" : "Unavailable"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className='flex gap-3'>
                    <Button 
                      size='sm' 
                      variant='success' 
                      icon={<Eye className='w-full h-full' />} 
                      onClick={() => handleShowPopup(item.id)} // Show restaurant details on click
                    />
                    <Button
                      size='sm'
                      variant='info'
                      icon={<Edit className='w-full h-full' />}
                      onClick={() => handleEditClick(item)}
                    />
                    <Button
                      size='sm'
                      variant="danger"
                      icon={<TrashIcon className='w-full h-full' />}
                      onClick={() => {
                        setSelectedID(item.id);
                        setIsDeletePopupOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No menu items found.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>

      {/* Popups */}
      <AddMenuItemPopup
        isOpen={isAddPopupOpen}
        handleClose={() => setIsAddPopupOpen(false)}
      />
      <ShowMenuItemPopup
        isOpen={isShowPopupOpen}
        handleClose={() => setIsShowPopupOpen(false)}
        menuItemId={selectedID}
      />
      <EditMenuItemPopup
        isOpen={isEditPopupOpen}
        handleClose={() => setIsEditPopupOpen(false)}
        defaultValues={selectedItem}
      />
      <DeleteMenuItemPopup
        isOpen={isDeletePopupOpen}
        handleClose={() => setIsDeletePopupOpen(false)}
        menuItemId={selectedID}
      />
    </div>
  );
};

export default ManageMenuItems;
