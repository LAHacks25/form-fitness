import ChatbotIcon from "./ChatbotIcon";

interface ChatMessageType {
  role: "user" | "model";
  text: string;
}

interface ChatMessageProps {
  chat: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  return (
    <div
      className={`message ${chat.role === "model" ? "bot" : "user"}-message`}
    >
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
