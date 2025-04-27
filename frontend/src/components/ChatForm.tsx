import { useRef, FormEvent } from "react";

// Define the chat message type
interface ChatMessageType {
  role: "user" | "model";
  text: string;
}

// Define props interface for the component
interface ChatFormProps {
  chatHistory: ChatMessageType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  generateBotResponse: (history: ChatMessageType[]) => Promise<void>;
}

const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add null check to prevent TypeScript errors
    if (!inputRef.current) return;

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) {
      return;
    }

    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };

  return (
    <form
      action="#"
      className="chat-form"
      onSubmit={handleFormSubmit}
      style={{ margin: "0px" }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
