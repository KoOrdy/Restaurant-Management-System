import { useState } from "react";
import { Button, Header } from "../../../components/ui";
import { LifeBuoy, Sofa, Star } from "lucide-react";
import { useRestaurantTables } from "../../../hooks/customer/useTableHook";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { MakeReservationPopup } from "../../customer/ManageReservations";
import { useGetRestaurantReviews } from "../../../hooks/customer/useRestaurantHook";
import { useSummarizeReviews } from "../../../hooks/useSummarizeReviews";

const RestaurantTables = () => {
  const { userId, role } = useSelector((state) => state.auth);
  const { restaurantID } = useParams();
  const { tables } = useRestaurantTables(restaurantID);
  const { reviews, isLoading: isLoadingReviews } = useGetRestaurantReviews(restaurantID);

  const { summary, isLoading: isLoadingSummary } = useSummarizeReviews(reviews);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleOpenPopup = (table) => {
    setSelectedTable(table);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedTable(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 py-10 space-y-12">
      <Header
        heading="Restaurant Tables"
        subtitle="Explore available tables and reserve your spot."
      />

      {/* Tables Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tables.length > 0 ? (
          tables.map((table) => (
            <div
              key={table.id}
              className="bg-white p-4 border rounded-xl shadow-lg flex flex-col items-center"
            >
              {/* Table with Chairs */}
              <div className="relative w-full flex justify-center items-center py-6">
                {/* Left Chairs */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Sofa key={i} className="w-8 h-8 text-gray-400" />
                  ))}
                </div>

                {/* Table */}
                <div className="w-40 h-20 bg-[#ffccd5] rounded-md flex items-center justify-center border border-[#A61B2B]">
                  <span className="text-[#A61B2B] font-semibold">{table.tableName}</span>
                </div>

                {/* Right Chairs */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Sofa key={i} className="w-8 h-8 text-gray-400" />
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <p className="text-lg font-medium text-gray-600 mt-2">
                Capacity: {table.capacity}
              </p>

              {/* Reserve Button */}
              <div className="mt-4 w-full">
                {userId && role === "customer" ? (
                  <Button
                    fullWidth={true}
                    icon={<LifeBuoy className="w-4 h-4" />}
                    size="sm"
                    variant="success"
                    onClick={() => handleOpenPopup(table)}
                  >
                    Reserve Now
                  </Button>
                ) : (
                  <Button fullWidth={true} size="sm" disabled variant="success">
                    Login as Customer
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No tables found.</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <Header
          heading="Customer Reviews"
          subtitle="See what others are saying about this restaurant."
        />

        {isLoadingReviews ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 p-5 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Review Summary Section */}
      {!isLoadingReviews && reviews.length > 0 && (
        <div className="mt-10 space-y-4">
          <Header
            heading="Summary of Reviews"
            subtitle="An AI-generated summary of what people are saying."
          />
          {isLoadingSummary ? (
            <p className="text-center text-gray-500">Generating summary...</p>
          ) : summary ? (
            <div className=" border-l-4 bg-emerald-50 border-blue-500 text-blue-900 p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-md text-gray-600">Average Rating:</span>
                  <div className="flex items-center gap-1 text-blue-600">
                    <span className="font-bold text-md">{summary.average_rating}</span>
                    {/* You can replace this with a star icon or a custom rating bar */}
                  </div>
                </div>

                <div>
                  <span className="font-medium text-md text-gray-600">Positive Overview:</span>
                  <p className="text-md text-gray-700">{summary.positive_overview}</p>
                </div>

                <div>
                  <span className="font-medium text-md text-gray-600">Negative Overview:</span>
                  <p className="text-md text-gray-700">{summary.negative_overview}</p>
                </div>
              </div>

            </div>

          ) : (
            <p className="text-center text-gray-400 italic">No summary available.</p>
          )}
        </div>
      )}

      {/* Reservation Popup */}
      {selectedTable && (
        <MakeReservationPopup
          isOpen={isPopupOpen}
          handleClose={handleClosePopup}
          table={selectedTable}
          restaurantId={restaurantID}
        />
      )}
    </div>
  );
};

export default RestaurantTables;
