import AuthForm from "../components/AuthForm";
import { NavLink } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="container">
      <div className="left">
        <p className="welcome">Welcome to Form Fitness</p>
        <p className="description">
          Are you ready to take your fitness to the next level?
        </p>
        <p>
          Not a member? <NavLink to="/">Sign up here</NavLink>
        </p>
      </div>
      <AuthForm signingUp={true} />
    </div>
  );
};

export default Login;
