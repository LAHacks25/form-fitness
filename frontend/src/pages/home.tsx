import { NavBar } from "../components/Navbar";
import logo from "../assets/logo2.jpg";
import Carousel from "../components/Carousel";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// import Chatbot from "../components/ChatBot";

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
          "http://127.0.0.1:5000/api/auth/check_auth",
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
      <Carousel />
      <div className="bottom">
        <p className="desc">
          Welcome to Form Fitness – the ultimate all-in-one fitness app. Whether
          you're tracking your workouts, improving your form with real-time
          feedback, or connecting with a supportive community, we're here to
          help you reach your fitness goals.
        </p>
        <NavLink className="nav" to={isLoggedIn ? "/dashboard" : "/login"}>
          Get Started
        </NavLink>
      </div>
    </div>
  );
}
