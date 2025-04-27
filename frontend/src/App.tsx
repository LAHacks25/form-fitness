import "./App.css";
import "./globals.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import WorkoutLogger from "./pages/workoutlogger/workoutlogger";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workoutlogger" element={<WorkoutLogger />} />
      </Routes>
    </div>
  );
}

export default App;
