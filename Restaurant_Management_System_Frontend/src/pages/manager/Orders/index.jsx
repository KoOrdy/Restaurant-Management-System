import React, { useState, useMemo } from "react";
import { OrderCard, Header, Input, Button } from "../../../components/ui";
import { useGetManagerOrders } from "../../../hooks/manager/useOrdersHook";
import { ChangeOrderStatusPopup } from "./views";
import { Search, ArrowDownUp } from "lucide-react";

const Orders = () => {
  const { orders, isLoading } = useGetManagerOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const openPopup = (order) => setSelectedOrder(order);
  const closePopup = () => setSelectedOrder(null);

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
        subtitle="Track, filter, and update order statuses" 
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
        <Button
          variant="outline"
          onClick={() => setSortAsc(!sortAsc)}
          icon={<ArrowDownUp />}
        >
          Sort ({sortAsc ? "Asc" : "Desc"})
        </Button>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : filteredAndSortedOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAndSortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} onEdit={() => openPopup(order)} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}


      {/* Popup for Changing Status */}
      {selectedOrder && (
        <ChangeOrderStatusPopup
          isOpen={!!selectedOrder}
          handleClose={closePopup}
          order={selectedOrder}
          orderId={selectedOrder.id}
        />
      )}
    </div>
  );
};

export default Orders;
