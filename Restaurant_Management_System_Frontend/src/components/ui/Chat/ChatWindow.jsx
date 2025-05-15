import React, { useEffect, useRef, useState } from "react";
import { Send, X, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { useGetRestaurantManagersForCustomer } from "../../../hooks/customer/useRestaurantHook";
import RestaurantManagerCard from "./RestaurantManagerCard";
import { useGetChatHistory } from "../../../hooks/useChatHook";

const ChatWindow = ({ onClose }) => {
  const { userId, token } = useSelector((state) => state.auth);
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const connectionRef = useRef(null);

  const { managers = [], isLoading } = useGetRestaurantManagersForCustomer();
  const { messages: oldMessages = [] } = useGetChatHistory(selectedManagerId);

  // Initialize SignalR
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
      setMessages((prev) => [
        ...prev,
        {
          sender: newMsg.senderId === parseInt(userId) ? "user" : "manager",
          text: newMsg.content,
          timestamp: newMsg.timestamp,
        },
      ]);
    });

    return () => {
      connection.stop();
    };
  }, [token, userId]);

  // Load old messages when manager is selected
  useEffect(() => {
    if (!selectedManagerId) return;

    const formattedOldMessages = oldMessages.map((msg) => ({
      sender: msg.senderId === parseInt(userId) ? "user" : "manager",
      text: msg.content,
      timestamp: msg.timestamp,
    }));

    setMessages(formattedOldMessages);
  }, [selectedManagerId, oldMessages, userId]);

  const handleSend = async () => {
    if (!input.trim() || !selectedManagerId || !connectionRef.current) return;

    try {
      await connectionRef.current.invoke(
        "SendMessage",
        parseInt(selectedManagerId),
        input
      );
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input, timestamp: new Date().toISOString() },
      ]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message via SignalR.", err);
    }
  };

  const handleCloseChat = () => {
    setSelectedManagerId(null);
    setMessages([]);
  };

  return (
    <div className="fixed bottom-10 right-10 w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Chat</h3>
        <button onClick={onClose} className="cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Manager Selection */}
      {!selectedManagerId ? (
        <div className="p-3 overflow-y-auto flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Choose a manager to chat with:
          </p>
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading managers...</p>
          ) : (
            <div className="space-y-2">
              {managers.map((manager) => (
                <RestaurantManagerCard
                  key={manager.managerId}
                  restaurant={manager}
                  onSelect={setSelectedManagerId}
                  isSelected={selectedManagerId === manager.managerId}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex-1 p-4 overflow-y-auto space-y-2 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">
                Chat with Manager #{selectedManagerId}
              </span>
              <button
                onClick={handleCloseChat}
                className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Back
              </button>
            </div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-md max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-2 flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-blue-500 font-semibold hover:text-blue-600 cursor-pointer"
            >
              <Send />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
