import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg";

export const NavBar = () => {
  return (
    <nav>
      <NavLink className="title" to="/">
        Form Fitness
      </NavLink>
      <ul>
        <li>
          <NavLink className="link" to="/dashboard">
            Form Checker
          </NavLink>
        </li>

        <li>
          <NavLink className="link" to="/">
            Workout Tracker
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/login">
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
