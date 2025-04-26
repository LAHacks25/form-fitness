import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

interface AuthFormProps {
  signingUp: boolean;
}
const AuthForm: React.FC<AuthFormProps> = ({ signingUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitSignup = async (email: string, password: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration Failed");
      }

      return data;
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };

  const handleSubmitLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login Failed");
      }

      console.log("Signup Success");

      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (signingUp) {
        await handleSubmitSignup(email, password);
      } else {
        await handleSubmitLogin(email, password);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>{signingUp ? "User Signup" : "User Login"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChangeEmail}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleChangePassword}
        required
      />

      <button type="submit">{signingUp ? "Sign Up" : "Log In"}</button>
    </form>
  );
};

export default AuthForm;
