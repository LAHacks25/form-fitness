import { NavBar } from "../components/Navbar";
import logo from "../assets/logo2.jpg";
import Carousel from "../components/Carousel";
import { NavLink } from "react-router-dom";
// import Chatbot from "../components/ChatBot";

import "./home.css";

export default function Home() {
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
        <NavLink className="nav" to="/dashboard">
          Get Started
        </NavLink>
      </div>
    </div>
  );
}
