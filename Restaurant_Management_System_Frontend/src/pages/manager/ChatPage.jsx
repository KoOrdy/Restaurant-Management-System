import React, { useEffect, useState, useRef } from "react";
import { Send, User } from "lucide-react";
import { useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { useGetChatHistory } from "../../hooks/useChatHook";
import { Button, Input, SectionHeader } from "../../components/ui";

const ChatPage = () => {
  const { userId, token } = useSelector((state) => state.auth);
  const [messageContent, setMessageContent] = useState("");
  const [messagesByUser, setMessagesByUser] = useState({});
  const [activeChatUser, setActiveChatUser] = useState(null);
  const connectionRef = useRef(null);

  const {
    messages = [],
    isLoading,
    isError,
    error: queryError,
  } = useGetChatHistory(activeChatUser);

  useEffect(() => {
    if (activeChatUser && messages.length > 0) {
      setMessagesByUser((prev) => ({
        ...prev,
        [activeChatUser]: messages,
      }));
    }
  }, [messages, activeChatUser]);

  useEffect(() => {
    if (!token || !userId) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5135/chatHub", {
        accessTokenFactory: () => token,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        console.log("SignalR connected.");
        connection.invoke("JoinChat", parseInt(userId));
        connectionRef.current = connection;
      })
      .catch((err) => {
        console.error("SignalR connection error:", err);
      });

    connection.on("ReceiveMessage", (newMsg) => {
      setMessagesByUser((prev) => {
        const userMessages = prev[activeChatUser] || [];
        return {
          ...prev,
          [activeChatUser]: [...userMessages, newMsg],
        };
      });
    });

    return () => {
      connection.stop();
    };
  }, [token, userId, activeChatUser]);

  const sendMessage = async () => {
    if (!activeChatUser || !messageContent) return;

    if (!connectionRef.current || connectionRef.current.state !== "Connected") {
      console.error("SignalR is not connected yet.");
      return;
    }

    try {
      await connectionRef.current.invoke("SendMessage", parseInt(activeChatUser), messageContent);

      const newMessage = {
        senderId: parseInt(userId),
        receiverId: parseInt(activeChatUser),
        content: messageContent,
        timestamp: new Date().toISOString(),
      };

      setMessagesByUser((prev) => {
        const userMessages = prev[activeChatUser] || [];
        return {
          ...prev,
          [activeChatUser]: [...userMessages, newMessage],
        };
      });

      setMessageContent("");
    } catch (err) {
      console.error("Failed to send message via SignalR.", err);
    }
  };

  const uniqueSenders = [
    ...new Set(Object.values(messagesByUser).flat().map((msg) => msg.senderId).filter((id) => id !== parseInt(userId))),
  ];

  const filteredMessages = activeChatUser ? messagesByUser[activeChatUser] || [] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      {/* Left Sidebar: Customer List */}
      <div className="border-r p-4 bg-gray-50 overflow-y-auto">
        <SectionHeader title={"Customers"} />
        <div className="space-y-2">
          {uniqueSenders.length === 0 && (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          )}
          {uniqueSenders.map((senderId) => (
            <button
              key={senderId}
              onClick={() => setActiveChatUser(senderId.toString())}
              className={`w-full flex items-center gap-2 p-5 rounded hover:bg-blue-100 transition cursor-pointer ${
                activeChatUser === senderId.toString()
                  ? "bg-blue-100 font-semibold"
                  : "bg-white"
              }`}
            >
              <User className="w-5 h-5 text-gray-600" />
              <span>Anonymous #{senderId}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="col-span-3 flex flex-col p-4 overflow-auto">
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 border rounded p-4 bg-white">
          <SectionHeader title={"Chat"} />

          {isLoading && <p className="text-gray-500">Loading messages...</p>}
          {!isLoading && filteredMessages.length === 0 && (
            <p className="text-gray-500 text-sm">No messages to show.</p>
          )}
          {filteredMessages.map((msg, index) => (
            <div
              key={msg.id || `${msg.senderId}-${msg.timestamp}-${index}`}
              className={`p-3 max-w-xs rounded-lg text-sm ${
                msg.senderId === parseInt(userId)
                  ? "bg-blue-100 text-right ml-auto"
                  : "bg-gray-100 text-left mr-auto"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs text-gray-400 block">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2">
          <Input
              type="text"
              placeholder="Type a message..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
          />
          <Button icon={<Send className="w-full h-full" />} onClick={sendMessage} />
        </div>

        {isError && (
          <p className="text-red-500 text-sm mt-2">{queryError?.message}</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
