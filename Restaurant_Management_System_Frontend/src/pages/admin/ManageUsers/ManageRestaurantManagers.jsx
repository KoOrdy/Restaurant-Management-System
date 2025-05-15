import React, { useState, useMemo } from 'react';
import { ActionCard, Button, CountCard, Header, Input, SectionHeader, Table, TableCell, TableRow } from '../../../components/ui';
import { CirclePlus, Edit, TrashIcon, UserCog, Users, Search, ArrowDownUp } from 'lucide-react';
import { useGetAllUsers } from '../../../hooks/admin/useUserHook';
import { DeleteUserPopup, EditUserPopup } from './views';
import { useNavigate } from 'react-router';

const ManageRestaurantManagers = () => {
  const navigate = useNavigate();

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [selectedID, setSelectedID] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const { users } = useGetAllUsers("Manager");

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortAsc) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    return filtered;
  }, [users, searchTerm, sortAsc]);

  return (
    <div className="sm:p-5 p-3 space-y-5">
      <Header heading="Manage Restaurant Managers" subtitle="Add, edit, or delete restaurant managers for the system." />
      
      <div className="space-y-5 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        <CountCard 
          title="Total Restaurant Managers"
          description="Current approved restaurant managers"
          count={users.length}
          icon={<CirclePlus />}
        />

        <div className="flex flex-col sm:flex-row gap-4 mx-auto w-full max-w-fit">
          <ActionCard
            icon={<Users />}
            iconBgColor="bg-blue-600"
            iconColor="text-white"
            title="View Customers"
            description="Click below to view all registered customers"
          >
            <Button fullWidth onClick={() => navigate("/admin/customers")} variant='info'>
              Go to Customers
            </Button>
          </ActionCard>

          <ActionCard
            icon={<UserCog />}
            iconBgColor="bg-green-600"
            iconColor="text-white"
            title="View Restaurant Managers"
            description="Click below to view all restaurant managers"
          >
            <Button fullWidth onClick={() => navigate("/admin/restaurant-managers")} variant='success'>
              Go to Managers
            </Button>
          </ActionCard>
        </div>
      </div>

      <div className="bg-white shadow-md space-y-5 p-5 rounded-lg">
        <SectionHeader title="Manage Restaurant Managers" description="Here you can view and manage all approved restaurant managers." />

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
            onClick={() => setSortAsc(!sortAsc)}
            icon={<ArrowDownUp />}
          >
            Sort ({sortAsc ? "Asc" : "Desc"})
          </Button>
        </div>

        <div className="w-full overflow-x-auto">
          <Table columns={["#ID", "Name", "Email", "Role", "Action"]}>
            {filteredAndSortedUsers.length > 0 ? (
              filteredAndSortedUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className='flex gap-3'>
                    <Button 
                      size='sm' 
                      variant='info' 
                      icon={<Edit className='w-full h-full' />} 
                      onClick={() => handleEditClick(user)}
                    />
                    <Button 
                      size='sm' 
                      variant="danger"
                      icon={<TrashIcon className='w-full h-full' />} 
                      onClick={() => { 
                        setIsDeletePopupOpen(true);
                        setSelectedID(user.id);
                      }} 
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No approved restaurant managers found.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>

      {/* Popups */}
      <EditUserPopup
        isOpen={isEditPopupOpen}
        handleClose={() => setIsEditPopupOpen(false)}
        defaultValues={selectedUser}
      />
      <DeleteUserPopup
        isOpen={isDeletePopupOpen}
        handleClose={() => setIsDeletePopupOpen(false)}
        userId={selectedID}
      />
    </div>
  );
}

export default ManageRestaurantManagers;
