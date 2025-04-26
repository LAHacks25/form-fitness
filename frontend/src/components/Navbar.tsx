import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Temp</NavLink>
        </li>
        <li>
          <NavLink to="/">Temp</NavLink>
        </li>
        <li>
          <NavLink to="/">Temp</NavLink>
        </li>
      </ul>
    </nav>
  );
};
