import "./LogoutButton.css";

const Logout = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        credentials: "include",
      });
      const data = response.json();
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleClick}>Log Out</button>;
};

export default Logout;
