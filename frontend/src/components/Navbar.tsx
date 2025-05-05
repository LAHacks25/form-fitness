import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";

export const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check login status when component mounts
    const checkLoginStatus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/check_auth", {
          credentials: "include", // Important for cookies/session
        });
        const data = await response.json();
        setIsLoggedIn(data.authenticated);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

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
          <NavLink
            className="link"
            to={isLoggedIn ? "/workouttracker" : "/login"}
          >
            Workout Tracker
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={isLoggedIn ? "/profile" : "/login"}>
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
