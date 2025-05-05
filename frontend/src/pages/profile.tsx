import logo from "../assets/logo2.jpg";
import "./profile.css";
import { useState, useEffect } from "react";
import { NavBar } from "../components/Navbar";
import Logout from "../components/LogoutButton";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check login status when component mounts
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/profile", {
          credentials: "include", // Important for cookies/session
        });
        const data = await response.json();
        setEmail(data.email);
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();

    const getWorkoutData = async () => {
      try {
        const response = await fetch("api/mongoget", {
          credentials: "include",
        });
        const data = await response.json();
        setTotalWorkouts(data.workouts.length);

        let repCount = 0;

        data.workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            repCount += exercise.sets * exercise.reps;
          });
        });

        setTotalReps(repCount);
      } catch (error) {
        console.error(error);
      }
    };

    getWorkoutData();
  }, []);

  return (
    <div className="profilePageContainer">
      <NavBar />
      <div className="profileContainer">
        <img src={logo} />
        <p className="welcome">{`Welcome ${email}!`}</p>
        <p>Your Overview:</p>
        <p>{`Total Workouts Recorded: ${totalWorkouts}`}</p>
        <p>{`Total Reps Recorded: ${totalReps}`}</p>
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
