import React, { useState } from "react";
import { MapPin, Pizza, Star, Utensils } from "lucide-react";
import Button from "../Button";
import { NavLink } from "react-router";
import AddReviewPopup from "./AddReviewPopup";
import { useSelector } from "react-redux";

const RestaurantCard = ({ name, location, description, imageUrl, id = "" }) => {
  const { userId, role } = useSelector((state) => state.auth);  // Now inside a component

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const openReviewPopup = () => setIsReviewOpen(true);
  const closeReviewPopup = () => setIsReviewOpen(false);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-white border-3 border-[#ffdcce] hover:border-[#d94e1b] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 max-w-4xl">
        <img
          src={imageUrl || "/default-image.webp"}
          alt={name}
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div className="p-6 flex flex-col justify-between md:w-1/2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>

          <div className="mt-4 flex justify-end gap-1">
            {
              !!userId && role == "customer" &&
              <Button variant="success" size="sm" icon={<Star className="w-full h-full" />} onClick={openReviewPopup} />
            }
            <NavLink to={`/restaurants/${id}/tables`} className={() => ""}>
              <Button variant="outline" size="sm" icon={<Utensils className="w-full h-full" />}>
                Book Table
              </Button>
            </NavLink>
            <NavLink to={`/restaurants/${id}/menu`} className={() => ""}>
              <Button variant="outline" size="sm" icon={<Pizza className="w-full h-full" />}>
                Menu
              </Button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Add Review Popup */}
      <AddReviewPopup
        isOpen={isReviewOpen}
        handleClose={closeReviewPopup}
        restaurantId={id}
      />
    </>
  );
};

export default RestaurantCard;
