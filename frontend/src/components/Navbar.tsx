import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg";

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <div className="leftItems">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/">Temp</NavLink>
          </li>
        </div>
        <li>
          <NavLink to="/login">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};
