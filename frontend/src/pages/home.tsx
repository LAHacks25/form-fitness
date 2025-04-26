import { NavBar } from "../components/Navbar";
import Image from "../components/Image";
import logo from "../assets/logo.svg";

import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <NavBar />
      <div className="title">
        <img src={logo} className="logo" />
        <p className="titleText">FORM FITNESS</p>
      </div>
      <div className="row">
        <Image src=""></Image>
        <Image src=""></Image>
        <Image src=""></Image>
      </div>
      <div className="bottomBox">
        <button>Get Started</button>
      </div>
    </div>
  );
}
