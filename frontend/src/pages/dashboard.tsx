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
      setExerciseSelected(true);
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
