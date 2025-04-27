import "./LogoutButton.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        credentials: "include",
      });
      const data = response.json();

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleClick}>Log Out</button>;
};

export default Logout;
