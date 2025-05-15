import { useState } from "react"
import ChatButton from "./ChatButton"
import ChatWindow from "./ChatWindow"

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you?" }
  ])

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text },
        { sender: "bot", text: "Thanks for your message!" }
      ])
    }, 500)
  }

  return (
    <>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}
      {isOpen && (
        <ChatWindow
          onClose={() => setIsOpen(false)}
          messages={messages}
          onSend={handleSendMessage}
        />
      )}
    </>
  )
}

export default Chat
