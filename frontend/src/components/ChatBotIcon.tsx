import coachblaze from "../assets/coachblaze.jpg";

const ChatbotIcon = () => {
  return (
    <img
      src={coachblaze}
      alt="Chatbot Icon"
      style={{
        width: "50px",
        height: "50px",
        objectFit: "cover", // prevents squishing
        borderRadius: "50%", // makes it a circle
      }}
    />
  );
};

export default ChatbotIcon;
