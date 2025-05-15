import React, { useMemo, useState } from "react";
import {
  Header,
  SectionHeader,
  Table,
  TableRow,
  TableCell,
  Input,
  Button,
  CountCard,
  StatusBadge,
} from "../../../components/ui";
import { ArrowDownUp, Search, CalendarClock } from "lucide-react";
import { useGetReservationById } from "../../../hooks/admin/useReservationHook"; // Assume this hook returns all reservations
import { useParams } from "react-router";

const ManageReservations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const { restaurantID } = useParams();

  const { reservations = [] } = useGetReservationById(restaurantID); // Assume this returns { reservations: [...] }

  

  const filteredReservations = useMemo(() => {
    let filtered = reservations;

    if (searchTerm) {
      filtered = filtered.filter((res) =>
        res.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) =>
      sortAsc ? a.id - b.id : b.id - a.id
    );

    return filtered;
  }, [reservations, searchTerm, sortAsc]);

  const handleSortToggle = () => setSortAsc((prev) => !prev);

  return (
    <div className="sm:p-5 p-3 space-y-5">
      <Header
        heading="Manage Reservations"
        subtitle="View all table reservations made by customers"
      />

      <div className="space-y-5 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <CountCard
          title="Total Reservations"
          description="All reservations recorded in the system"
          count={reservations.length}
          icon={<CalendarClock />}
        />
      </div>

      <div className="bg-white shadow-md space-y-5 p-5 rounded-lg">
        <SectionHeader
          title="Reservations Table"
          description="This table shows a list of reservations and their details"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="w-full sm:w-1/2">
            <Input
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="text-gray-400" />}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleSortToggle}
            icon={<ArrowDownUp />}
          >
            Sort ({sortAsc ? "Asc" : "Desc"})
          </Button>
        </div>

        <div className="w-full overflow-x-auto">
          <Table
            columns={[
              "#ID",
              "Customer",
              "Date",
              "Start Time",
              "End Time",
              "Guests",
              "Table",
              "Status",
            ]}
          >
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => (
                <TableRow key={res.id}>
                  <TableCell>{res.id}</TableCell>
                  <TableCell>{res.customerName}</TableCell>
                  <TableCell>
                    {new Date(res.reservationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{res.startTime}</TableCell>
                  <TableCell>{res.endTime}</TableCell>
                  <TableCell>{res.numberOfGuests}</TableCell>
                  <TableCell>{res.tableName}</TableCell>
                  <TableCell>
                    <StatusBadge
                      variant={
                        res.status === "Pending"
                          ? "info"
                          : res.status === "Approved"
                          ? "success"
                          : "error"
                      }
                      shape="rounded"
                    >
                      {res.status}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No reservations found.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageReservations;
