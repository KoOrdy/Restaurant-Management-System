import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Popup from "../Popup";
import { Field, InputErrorMessage, Label, Textarea } from "../Form";
import Button from "../Button";
import { useManageRestaurantReviews } from "../../../hooks/customer/useRestaurantHook";
import { reviewSchema } from "../../../validation/reviewSchema";
import { Star } from "lucide-react"; // Or use any star icon you have

const AddReviewPopup = ({ isOpen, handleClose, restaurantId }) => {
  const {
    register,
    handleSubmit: formSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewSchema),
    mode: "onChange",
  });

  const { addReview, isAdding } = useManageRestaurantReviews();
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setValue("rating", rating); // set hidden input
  };

  const onSubmit = (data) => {
    addReview(
      {
        restaurantId,
        review: {
          rating: Number(data.rating),
          comment: data.comment,
          reviewDate: new Date().toISOString(),
        },
      },
      {
        onSuccess: () => {
          reset();
          setSelectedRating(0);
          handleClose();
        },
      }
    );
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Add Review"
      description="Leave your rating and comment for this restaurant."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={formSubmit(onSubmit)}>
        <Field>
          <Label>Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    selectedRating >= star ? "fill-orange-400 stroke-orange-400" : "stroke-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
          <input type="hidden" {...register("rating")} />
          {errors.rating && <InputErrorMessage>{errors.rating.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Comment</Label>
          <Textarea
            {...register("comment")}
            placeholder="Write your review here..."
            isError={!!errors.comment}
          />
          {errors.comment && <InputErrorMessage>{errors.comment.message}</InputErrorMessage>}
        </Field>

        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth isLoading={isAdding}>
            Submit Review
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default AddReviewPopup;
