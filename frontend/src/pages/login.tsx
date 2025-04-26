import AuthForm from "../components/AuthForm";
import "./login.css";

const Login = () => {
  return (
    <div className="container">
      <AuthForm signingUp={true} />
    </div>
  );
};

export default Login;
