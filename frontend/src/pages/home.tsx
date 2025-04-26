import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { NavBar } from "../components/Navbar";
import Box from "../components/Box"
import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <NavBar />
      <LoginButton />
      <LogoutButton />
      <Box />
    </div>
  );
}
