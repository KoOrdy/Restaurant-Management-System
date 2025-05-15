import React, { useState, useMemo } from 'react';
import {
  Header,
  SectionHeader,
  Table,
  TableCell,
  TableRow,
  Button,
  StatusBadge,
  Input,
  ActionCard
} from '../../../components/ui';
import { Wrench, Search, ArrowDownUp, AlarmClock } from 'lucide-react';
import { useGetManagerReservations } from '../../../hooks/manager/useReservationsHook';
import ApproveRejectReservationPopup from './views/ApproveRejectReservationPopup';
import { MarkFinishedPopup } from './views';

const ManageReservations = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isMarkPopupOpen, setIsMarkPopupOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const { reservations = [], isLoading } = useGetManagerReservations();

  const handlePopupOpen = (id) => {
    setSelectedId(id);
    setPopupOpen(true);
  };

  const filteredAndSortedReservations = useMemo(() => {
    let filtered = reservations;

    if (searchTerm) {
      filtered = filtered.filter((res) =>
        res.customerName.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [reservations, searchTerm, sortAsc]);

  return (
    <div className="sm:p-5 p-3 space-y-5">
      <Header heading="Manage Reservations" subtitle="Approve or reject pending reservations" />

      <div className="bg-white shadow-md space-y-5 p-5 rounded-lg">
        <SectionHeader title="Reservations List" description="Review all table reservation requests" />

        <div className="space-y-5 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <ActionCard
            icon={<AlarmClock />}
            iconBgColor="bg-[#F46036]"
            iconColor="text-white"
            title="Mark All Finished"
            description="Click the button to mark all past reservations as finished"
          >
            <Button fullWidth onClick={() => setIsMarkPopupOpen(true)} variant="warning">
              Mark All as Finished
            </Button>
          </ActionCard>
        </div>
        {/* Search and Sort controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center w-full sm:w-1/2">
            <Input
              placeholder="Search by customer name..."
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
          <Table columns={["ID", "Customer", "Date", "Start", "End", "Table", "Status", "Actions"]}>
            {!isLoading && filteredAndSortedReservations.length > 0 ? (
              filteredAndSortedReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.customerName}</TableCell>
                  <TableCell>{new Date(reservation.reservationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{reservation.startTime}</TableCell>
                  <TableCell>{reservation.endTime}</TableCell>
                  <TableCell>{reservation.tableName}</TableCell>
                  <TableCell>
                    <StatusBadge
                      variant={reservation.status === "Pending" ? "info" : reservation.status === "Accepted" ? "success" : reservation.status === "Rejected" ? "error" : ""}
                      shape="rounded"
                    >
                      {reservation.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {reservation.status === 'Pending' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={<Wrench className="w-full h-full" />}
                        onClick={() => handlePopupOpen(reservation.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  {isLoading ? "Loading..." : "No reservations found."}
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>

      <ApproveRejectReservationPopup
        isOpen={popupOpen}
        handleClose={() => setPopupOpen(false)}
        reservationId={selectedId}
      />

      <MarkFinishedPopup
        isOpen={isMarkPopupOpen}
        handleClose={() => setIsMarkPopupOpen(false)}
      />
    </div>
  );
};

export default ManageReservations;
