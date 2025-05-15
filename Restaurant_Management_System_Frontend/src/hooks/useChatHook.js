import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchChatHistoryService } from "../services/chat.services";

const CHAT_HISTORY_QUERY_KEY = "chatHistory";

const useGetChatHistory = (receiverId) => {
  const { token } = useSelector((state) => state.auth);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [CHAT_HISTORY_QUERY_KEY, receiverId],
    queryFn: () => fetchChatHistoryService(receiverId, token),
    enabled: !!token && !!receiverId,
  });

  return {
    messages: data?.data?.data?.messages || [],
    isLoading,
    isError,
    error,
  };
};

export { useGetChatHistory };
