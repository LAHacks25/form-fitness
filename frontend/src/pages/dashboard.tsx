import React, { useState, ChangeEvent } from "react";
import { NavBar } from "../components/Navbar";
import DashBoxes from "../components/DashBoxes";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [exerciseSelected, setExerciseSelected] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const exercise = event.target.value;
    setSelectedExercise(exercise);
  };

  const handleSubmit = () => {
    console.log(selectedExercise);

    if (selectedExercise !== "") {
      // Send POST request
      fetch("http://127.0.0.1:5000/api/send_string", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: selectedExercise }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          setExerciseSelected(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div
      className={`dashboardContainer ${exerciseSelected ? "" : "overlay"} ${
        exerciseSelected ? "solidBackground" : "imageBackground"
      }`}
    >
      <NavBar />
      <DashBoxes
        exercise={selectedExercise}
        hidden={exerciseSelected ? false : true}
      />
      <div className={`selectionContainer ${exerciseSelected ? "hidden" : ""}`}>
        <p className="instruction">Select an exercise</p>
        <select
          className="dropdown"
          value={selectedExercise}
          onChange={handleSelect}
        >
          <option value="" disabled>
            Select an Exercise
          </option>
          <option value="pushups">Pushups</option>
          <option value="situps">Situps</option>
          <option value="shoulder-press">Shoulder Press</option>
        </select>
        <button className="submitButton" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
