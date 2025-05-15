import React, { useState, useMemo } from 'react';
import { ActionCard, Button, CountCard, Header, Input, SectionHeader, Table, TableCell, TableRow } from '../../../components/ui';
import { CirclePlus, CookingPot, Edit, Search, TrashIcon, ArrowDownUp } from 'lucide-react';
import { AddCategoryPopup, DeleteCategoryPopup, EditCategoryPopup } from './views';
import { useGetAllCategories } from '../../../hooks/admin/useCategoryHook';

const ManageFoodCategories = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [selectedID, setSelectedID] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const { categories } = useGetAllCategories();

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditPopupOpen(true);
  };

  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [categories, searchTerm, sortAsc]);

  return (
    <div className="sm:p-5 p-3 space-y-5">
      <Header heading="Manage Food Categories" subtitle="Add, edit, or delete food categories for your restaurant." />
      
      <div className="space-y-5 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <CountCard 
          title="Total Categories"
          description="Current active food categories"
          count={categories.length}
          icon={<CookingPot />}
        />
        <ActionCard
          icon={<CirclePlus />}
          iconBgColor="bg-green-600"
          iconColor="text-[#ffffff]"
          title="Add New Category"
          description="Click the button below to add a new food category"
        >
          <Button fullWidth onClick={() => setIsAddPopupOpen(true)} variant='success'>
            Add Category
          </Button>
        </ActionCard>
      </div>

      <div className="bg-white shadow-md space-y-5 p-5 rounded-lg">
        <SectionHeader title="Manage Categories" description="Here you can view and manage all food categories." />

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
          <Table columns={["#ID", "Name", "Action"]}>
            {filteredAndSortedCategories.length > 0 ? (
              filteredAndSortedCategories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className='flex gap-3'>
                    <Button 
                      size='sm' 
                      variant='info' 
                      icon={<Edit className='w-full h-full' />} 
                      onClick={() => handleEditClick(category)}
                    />
                    <Button 
                      size='sm' 
                      variant="danger"
                      icon={<TrashIcon className='w-full h-full' />} 
                      onClick={() => { 
                        setIsDeletePopupOpen(true);
                        setSelectedID(category.id);
                      }} 
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>

      {/* Popups */}
      <AddCategoryPopup
        isOpen={isAddPopupOpen}
        handleClose={() => setIsAddPopupOpen(false)}
      />
      <EditCategoryPopup
        isOpen={isEditPopupOpen}
        handleClose={() => setIsEditPopupOpen(false)}
        defaultValues={selectedCategory}
      />
      <DeleteCategoryPopup
        isOpen={isDeletePopupOpen}
        handleClose={() => setIsDeletePopupOpen(false)}
        categoryId={selectedID}
      />
    </div>
  );
};

export default ManageFoodCategories;
