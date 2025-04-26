import AuthForm from "../components/AuthForm";
import { NavLink } from "react-router-dom";
import "./login.css";

const Login = () => {
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
        <AuthForm signingUp={false} />
        <p className="signupPrompt">
          Don't have an account? <NavLink to="/">Sign up here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
