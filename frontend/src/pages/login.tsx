import AuthForm from "../components/AuthForm";
import { NavLink } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="loginContainer">
      <div className="left">
        <p className="welcome">Welcome to Form Fitness</p>
        <p className="description">
          Form Fitness is designed for gym-goers of all levels, offering tools
          to help you track progress, improve performance, and achieve your
          fitness goals.
        </p>
      </div>
      <div className="authForm">
        <AuthForm signingUp={false} />
        <p className="signupPrompt">
          Don't have an account? <NavLink to="/signup">Sign up here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
