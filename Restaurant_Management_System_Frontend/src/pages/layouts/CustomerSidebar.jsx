import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleCustomerSidebar } from "../../store/slices/reservationSlice";
import { format } from "date-fns";
import { Button, StatusBadge } from "../../components/ui";
import { DeleteReservationPopup, RescheduleReservationPopup } from "../customer/ManageReservations";
import { X } from "lucide-react";
import { useGetCustomerReservations } from "../../hooks/customer/useReservationHook";
import { NavLink } from "react-router";
import { CancelOrderPopup } from "../customer/ManageOrders";

const CustomerSidebar = () => {
  const dispatch = useDispatch();
  const { reservations, loading } = useGetCustomerReservations();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [popups, setPopups] = useState({
    isReschedulePopupOpen: false,
    isDeletePopupOpen: false,
    isCancelOrderPopupOpen: false,
  });
  const [collapsedOrders, setCollapsedOrders] = useState({});

  const openPopup = (type, reservation) => {
    setSelectedReservation(reservation);
    setPopups((prev) => ({ ...prev, [type]: true }));
  };

  const closePopup = () => {
    setSelectedReservation(null);
    setPopups({
      isReschedulePopupOpen: false,
      isDeletePopupOpen: false,
      isCancelOrderPopupOpen: false,
    });
  };

  const handleCloseSidebar = () => {
    dispatch(toggleCustomerSidebar());
  };

  const toggleCollapse = (reservationId) => {
    setCollapsedOrders((prev) => ({
      ...prev,
      [reservationId]: prev[reservationId] ? false : true,
    }));
  };

  console.log(reservations);
  

  const renderButtons = (reservation) => {
    return (
      <>
        {reservation.status === "Accepted" && (
          reservation.order == null ? (
            <NavLink to={`customer/restaurants/${reservation.restaurantId}/menu?reservationID=${reservation.id}`}>
              <Button size="sm" variant="success">
                Make Order
              </Button>
            </NavLink>
          ) : (
            <Button size="sm" variant="cancel" onClick={() => openPopup("isCancelOrderPopupOpen", reservation)}>
              Cancel Order
            </Button>
          )
        )}
        {reservation.status === "Pending" && (
          <Button size="sm" variant="secondary" onClick={() => openPopup("isReschedulePopupOpen", reservation)}>
            Reschedule
          </Button>
        )}
        <Button size="sm" variant="danger" onClick={() => openPopup("isDeletePopupOpen", reservation)}>
          Delete
        </Button>
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-xl font-semibold text-gray-500">
        <div className="spinner"></div> {/* You can add a spinner component here */}
        Loading your reservations...
      </div>
    );
  }

  return (
    <div className="z-50 fixed top-0 right-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0 opacity-100 overflow-y-auto">
      <div className="p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Reservations</h2>
          <div className="flex space-x-3">
            <Button
              onClick={handleCloseSidebar}
              icon={<X size={20} className="w-full h-full" />}
              size="sm"
            />
          </div>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center text-lg text-gray-400">No reservations found.</div>
        ) : (
          <ul className="space-y-6">
            {reservations.map((reservation) => (
              <li
                key={reservation.id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{reservation.restaurantName}</h3>
                  <StatusBadge
                    variant={
                      reservation.status === "Pending"
                        ? "info"
                        : reservation.status === "Accepted"
                        ? "success"
                        : reservation.status === "Rejected"
                        ? "error"
                        : ""
                    }
                    size="small"
                    shape="rounded"
                  >
                    {reservation.status}
                  </StatusBadge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong className="font-medium">Reservation Date:</strong> {format(new Date(reservation.reservationDate), "MMMM dd, yyyy")}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong className="font-medium">Time:</strong> {reservation.startTime} - {reservation.endTime}
                  </p>
                  <div className="flex gap-1">{renderButtons(reservation)}</div>

                  {reservation.order && reservation.order.orderItems.length > 0 && (
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleCollapse(reservation.id)}
                      >
                        {collapsedOrders[reservation.id] ? "Hide Order Items" : "Show Order Items"}
                      </Button>
                      {collapsedOrders[reservation.id] && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            {/* Order Status and Total Amount */}
                            <div className="flex justify-between items-center mb-4">
                              <p className="text-sm font-semibold text-gray-700">{reservation.order.status}</p>
                              <p className="text-sm font-semibold text-gray-900">
                                Total Amount: <span className="text-lg font-bold text-green-600">${reservation.order.totalAmount.toFixed(2)}</span>
                              </p>
                            </div>
                            
                            {/* Order Items List */}
                            <ul className="space-y-3">
                              {reservation.order.orderItems.map((item, index) => (
                                <li key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                                  <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                      <p className="text-sm text-gray-800 font-medium">Menu Item: <span className="text-gray-600">{item.menuItemName}</span></p>
                                      <p className="text-sm text-gray-800 font-medium">Menu Item ID: <span className="text-gray-600">{item.menuItemId}</span></p>
                                      <p className="text-sm text-gray-800 font-medium">Quantity: <span className="text-gray-600">{item.quantity}</span></p>
                                      <p className="text-sm text-gray-800 font-medium">Unit Price: <span className="text-gray-600">${item.unitPrice.toFixed(2)}</span></p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popups */}
      {popups.isReschedulePopupOpen && selectedReservation && (
        <RescheduleReservationPopup
          isOpen={popups.isReschedulePopupOpen}
          handleClose={closePopup}
          defaultValues={selectedReservation}
        />
      )}
      {popups.isDeletePopupOpen && selectedReservation && (
        <DeleteReservationPopup
          isOpen={popups.isDeletePopupOpen}
          handleClose={closePopup}
          reservationId={selectedReservation.id}
        />
      )}
      {popups.isCancelOrderPopupOpen && selectedReservation?.order && (
        <CancelOrderPopup
          isOpen={popups.isCancelOrderPopupOpen}
          handleClose={closePopup}
          orderId={selectedReservation.order.id}
        />
      )}
    </div>
  );
};

export default CustomerSidebar;
