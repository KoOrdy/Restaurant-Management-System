import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { summarizeReviewsService } from "../services/summarization.services";

const SUMMARIZE_REVIEWS_QUERY_KEY = "summarizeReviews";

const useSummarizeReviews = (reviews) => {
  const { token } = useSelector((state) => state.auth);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [SUMMARIZE_REVIEWS_QUERY_KEY, reviews],
    queryFn: () => summarizeReviewsService(reviews, token),
    enabled: !!token && Array.isArray(reviews) && reviews.length > 0,
  });
  console.log(data);
  
  return {
    summary: data || null,
    isLoading,
    isError,
    error,
  };
};

export { useSummarizeReviews };
