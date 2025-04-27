import AuthForm from "../components/AuthForm";
import { NavLink } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  return (
    <div className="loginContainer">
      <div className="left">
        <p className="welcome">Welcome to Form Fitness</p>
        <p className="description">
          The premier all-in-one fitness app geared towards all levels of
          gym-goers to help them achieve their fitness goals. Let us help you
          take your fitness to the next level.
        </p>
      </div>
      <div className="authForm">
        <AuthForm signingUp={true} />
        <p className="signupPrompt">
          Already have an account? <NavLink to="/login">Log in here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
