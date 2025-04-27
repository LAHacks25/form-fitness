import React, { useState, ChangeEvent } from "react";
import { NavBar } from "../components/Navbar";
import DashBoxes from "../components/DashBoxes";
import pushup from "../assets/pushup.webp";
import situp from "../assets/situps.jpg";
import shoulderpress from "../assets/shoulderpress.webp";
import logo from "../assets/logo2.jpg";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [exerciseSelected, setExerciseSelected] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedImage, setSelectedImage] = useState(logo);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const exercise = event.target.value;
    setSelectedExercise(exercise);

    if (exercise == "pushups") {
      setSelectedImage(pushup);
    } else if (exercise == "situps") {
      setSelectedImage(situp);
    } else {
      setSelectedImage(shoulderpress);
    }
  };

  const handleSubmit = () => {
    console.log(selectedExercise);

    if (selectedExercise != "") {
      setExerciseSelected(true);
    }
  };

  return (
    <div className={`dashboardContainer ${exerciseSelected ? "" : "overlay"}`}>
      <NavBar />
      <DashBoxes exercise={selectedExercise} />
      <div className={`selectionContainer ${exerciseSelected ? "hidden" : ""}`}>
        <p className="instruction">Select an exercise to record</p>
        <img src={selectedImage} className="exerciseImage" />
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
