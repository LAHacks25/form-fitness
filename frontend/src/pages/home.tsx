import { NavBar } from "../components/Navbar";
import Image from "../components/Image";
import logo from "../assets/logo.svg";
import Carousel from "../components/Carousel";

import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <NavBar />
      <div className="title">
        <img src={logo} className="logo" />
        <p className="titleText">FORM FITNESS</p>
      </div>
      <Carousel />
      <div className="bottomBox">
        <button>Get Started</button>
      </div>
    </div>
  );
}
