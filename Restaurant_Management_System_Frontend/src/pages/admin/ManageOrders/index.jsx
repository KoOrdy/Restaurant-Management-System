import React, { useState, useMemo } from "react";
import { OrderCard, Header, Input } from "../../../components/ui";
import { Search, ArrowDownUp } from "lucide-react";
import { useGetOrderById } from "../../../hooks/admin/useReservationHook";
import { useParams } from "react-router";

const Orders = () => {
  const { restaurantID } = useParams();

  const { orders, isLoading } = useGetOrderById(restaurantID);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toString().includes(searchTerm)
      );
    }

    filtered = [...filtered].sort((a, b) => {
      return sortAsc ? a.id - b.id : b.id - a.id;
    });

    return filtered;
  }, [orders, searchTerm, sortAsc]);

  return (
    <div className="p-6 mx-auto space-y-6">
      <Header 
        heading="Manage Orders" 
        subtitle="Track and filter your orders" 
      />

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
        <div className="flex items-center w-full sm:w-1/2">
          <Input
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="text-gray-400" />}
          />
        </div>
        <div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2"
          >
            <ArrowDownUp />
            Sort ({sortAsc ? "Asc" : "Desc"})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : filteredAndSortedOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAndSortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
