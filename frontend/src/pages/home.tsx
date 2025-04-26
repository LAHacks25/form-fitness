import { NavBar } from "../components/Navbar";
import logo from "../assets/logo.svg";
import Carousel from "../components/Carousel";
import { NavLink } from "react-router-dom";

import "./home.css";

export default function Home() {
  return (
    <div className="homeContainer">
      <NavBar />
      <div className="title">
        <img src={logo} className="logo" />
        <p className="titleText">FORM FITNESS</p>
      </div>
      <Carousel />
      <NavLink className="nav" to="/dashboard">
        Get Started
      </NavLink>
    </div>
  );
}
