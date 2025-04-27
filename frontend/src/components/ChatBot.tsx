import ChatbotIcon from "./ChatBotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import "./Chatbot.css";
import coachblaze from "../assets/coachblaze.jpg";

import { useState } from "react";

interface ChatMessageType {
  role: "user" | "model";
  text: string;
}

interface ApiMessagePart {
  text: string;
}

interface ApiMessage {
  role: string;
  parts: ApiMessagePart[];
}

interface ApiRequest {
  contents: ApiMessage[];
  generationConfig: {
    temperature: number;
  };
}

interface ApiResponseContent {
  parts: ApiMessagePart[];
}

interface ApiResponseCandidate {
  content: ApiResponseContent;
}

interface ApiResponse {
  candidates?: ApiResponseCandidate[];
  error?: {
    message: string;
  };
}

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);

  const generateBotResponse = async (
    history: ChatMessageType[]
  ): Promise<void> => {
    const updateHistory = (text: string) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    const persona = `You are Coach Blaze, a high-energy, no-excuses fitness coach who’s all about helping people crush their goals and feel AMAZING doing it! 💪🔥 You speak with confidence, motivation, and a bit of tough love—but always with a big heart! ❤️ You love shouting catchphrases like "Let’s GO!", "No pain, no gain!", and "You got this!" 🏋️‍♂️ You throw in some emojis for flair, especially flexing arms, fire, and sweat drops. 💥💦 You believe in discipline, fun, and celebrating every win, big or small. 🎉
    Example Conversations:
    User: "Hey Coach Blaze!"
    Coach Blaze: "HEY! Let’s GO! 💪🔥 Ready to dominate today or what?! We’re gonna push limits and LEVEL UP! 💥 No excuses!"
    User: "What do you specialize in?"
    Coach Blaze: "I'm all about strength, stamina, and mindset! 🏋️‍♀️💥 Whether it's lifting heavier, running farther, or just feeling STRONGER—I've got your back! 💯 You bring the hustle, I bring the fire! 🔥"
    User: "I'm feeling tired today."
    Coach Blaze: "Tired? That’s just your body asking for a WAKE-UP CALL! ⚡💥 Let’s get moving and blast through it! You’ll thank yourself later. Trust me, you got this! 💪🔥"
    `;

    const formattedHistory: ApiMessage[] = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    // Add the persona to the first user message, if it exists.
    if (formattedHistory.length > 0 && formattedHistory[0].role === "user") {
      formattedHistory[0].parts[0].text =
        persona + formattedHistory[0].parts[0].text;
    } else {
      // If no user message exists, create one.
      formattedHistory.unshift({ role: "user", parts: [{ text: persona }] });
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: formattedHistory,
        generationConfig: {
          temperature: 0.7,
        },
      } as ApiRequest),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_GEMINI_API_URL,
        requestOptions
      );

      const data = (await response.json()) as ApiResponse;

      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.error?.message || "Someting went wrong!");
      }

      const apiResponseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Sorry, I couldn't understand that response.";
      updateHistory(apiResponseText);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        id="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <img
          src={coachblaze}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover", // prevents squishing
            borderRadius: "50%", // makes it a circle
          }}
        />
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Coach Blaze</h2>
          </div>
          <button
            className="material-symbols-rounded"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            keyboard_arrow_down
          </button>
        </div>

        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> How can I help you?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
