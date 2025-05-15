import React, { useState, useMemo } from 'react';
import {
  ActionCard,
  Button,
  CountCard,
  Header,
  Input,
  SectionHeader,
  Table,
  TableCell,
  TableRow
} from '../../../components/ui';
import {
  CirclePlus,
  LayoutGrid,
  Edit,
  Search,
  TrashIcon,
  ArrowDownUp
} from 'lucide-react';
import {
  AddTablePopup,
  DeleteTablePopup,
} from './views';
import { useGetAllTables } from '../../../hooks/manager/tablesHooks';

const Tables = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [selectedID, setSelectedID] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const { tables } = useGetAllTables();



  const filteredAndSortedTables = useMemo(() => {
    let filtered = tables;

    if (searchTerm) {
      filtered = filtered.filter(table =>
        table.tableName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      return sortAsc ? a.id - b.id : b.id - a.id;
    });

    return filtered;
  }, [tables, searchTerm, sortAsc]);

  return (
    <div className="sm:p-5 p-3 space-y-5">
      <Header
        heading="Manage Tables"
        subtitle="Add, edit, or delete tables in your restaurant layout."
      />

      <div className="space-y-5 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <CountCard
          title="Total Tables"
          description="Current tables available"
          count={tables.length}
          icon={<LayoutGrid />}
        />
        <ActionCard
          icon={<CirclePlus />}
          iconBgColor="bg-green-600"
          iconColor="text-[#ffffff]"
          title="Add New Table"
          description="Click the button below to add a new table"
        >
          <Button fullWidth onClick={() => setIsAddPopupOpen(true)} variant="success">
            Add Table
          </Button>
        </ActionCard>
      </div>

      <div className="bg-white shadow-md space-y-5 p-5 rounded-lg">
        <SectionHeader title="Manage Tables" description="Here you can view and manage all tables." />

        {/* Search & Sort */}
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
          <Table columns={["#ID", "Table Name", "Capacity", "Action"]}>
            {filteredAndSortedTables.length > 0 ? (
              filteredAndSortedTables.map((table, index) => (
                <TableRow key={index}>
                  <TableCell>{table.id}</TableCell>
                  <TableCell>{table.tableName}</TableCell>
                  <TableCell>{table.capacity}</TableCell>
                  <TableCell className="flex gap-3">
                    <Button
                      size="sm"
                      icon={<TrashIcon className="w-full h-full" />}
                      onClick={() => {
                        setSelectedID(table.id);
                        setIsDeletePopupOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No tables found.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>

      {/* Popups */}
      <AddTablePopup isOpen={isAddPopupOpen} handleClose={() => setIsAddPopupOpen(false)} />
      <DeleteTablePopup
        isOpen={isDeletePopupOpen}
        handleClose={() => setIsDeletePopupOpen(false)}
        tableId={selectedID}
      />
    </div>
  );
};

export default Tables;
