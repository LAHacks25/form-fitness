import { NavBar } from "../components/Navbar";
import logo from "../assets/logo2.jpg";
import Carousel from "../components/Carousel";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Chatbot from "../components/ChatBot";

import "./home.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check login status when component mounts
    const checkLoginStatus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/auth/check_auth",
          {
            credentials: "include", // Important for cookies/session
          }
        );
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
    <div className="homeContainer fade-in">
      <NavBar />
      <div className="title">
        <img src={logo} className="logo" />
        <p className="titleText">FORM FITNESS</p>
      </div>
      <div className="bottom">
        <p className="desc">
          The all-in-one app to track workouts, improve form with real-time
          feedback, and connect with a supportive community to reach your
          fitness goals.
        </p>
        <NavLink className="nav" to={isLoggedIn ? "/dashboard" : "/login"}>
          Get Started
        </NavLink>
        <Chatbot />
      </div>
    </div>
  );
}
