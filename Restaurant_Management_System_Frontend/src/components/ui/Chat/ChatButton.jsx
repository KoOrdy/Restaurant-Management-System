import { MessageCircle } from "lucide-react"

const ChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="z-50 fixed bottom-10 right-10 bg-blue-500 text-white w-16 h-16 rounded-full cursor-pointer flex items-center justify-center shadow-lg"
    >
      <MessageCircle className="w-[50%] h-[50%]" />
    </button>
  )
}

export default ChatButton
