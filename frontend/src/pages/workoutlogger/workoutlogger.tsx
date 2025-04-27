<<<<<<< HEAD
import React, { useState } from "react";
import { FiPlus, FiX, FiSearch, FiChevronDown } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { NavBar } from "../../components/Navbar";
import "./WorkoutLogger.css";
=======
import React, { useState, useEffect } from 'react'
import { FiPlus, FiX, FiSearch, FiChevronDown } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import './WorkoutLogger.css'
>>>>>>> origin/main

interface ExerciseEntry {
  exercise: string;
  sets: number;
  reps: number;
}
interface Workout {
  id: string;
  title: string;
  exercises: ExerciseEntry[];
  date: string;
}

const EXERCISES = ["Push Up", "Leg Raise", "Shoulder Press"];

const initialWorkouts: Workout[] = [
  {
    id: "1",
    title: "Example Workout:",
    exercises: [
      { exercise: "Shoulder Press", sets: 4, reps: 12 },
      { exercise: "Push Up", sets: 4, reps: 12 },
    ],
    date: "2025-06-10",
  },
  // …etc…
];

export default function WorkoutLogger() {
<<<<<<< HEAD
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [filter, setFilter] = useState("Last 30 days");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
=======
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [filter, setFilter] = useState('Last 30 days')
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
>>>>>>> origin/main

  const [newWorkout, setNewWorkout] = useState<Workout>({
    id: "",
    title: "",
    exercises: [],
    date: "",
  });

  const [exercise, setExercise] = useState(EXERCISES[0]);
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/mongoget', {
          credentials: 'include'
        })
        if (!res.ok) {
          console.error('Failed to load workouts:', await res.text())
          return
        }
        const { workouts: data } = await res.json()
        setWorkouts(data)
      } catch (err) {
        console.error('Network error loading workouts:', err)
      }
    }
    load()
  }, [])

  function openNewWorkoutModal() {
    setNewWorkout({
      id: uuidv4(),
      title: "Set New Workout",
      exercises: [],
      date: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  }

  function addExercise() {
    setNewWorkout((w) => ({
      ...w,
      exercises: [...w.exercises, { exercise, sets, reps }],
    }));
    setExercise(EXERCISES[0]);
    setSets(1);
    setReps(1);
  }

  async function saveWorkout(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...newWorkout,
    };

    try {
      const res = await fetch("/api/mongowrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Save failed:", res.status, text);
        return;
      }

      const { inserted_id } = await res.json();
      console.log("Workout saved, new _id:", inserted_id);

      setWorkouts((ws) => [...ws, { ...newWorkout, id: inserted_id }]);

      setShowModal(false);
    } catch (err) {
      console.error("Network error saving workout:", err);
    }
  }

  const filtered = workouts.filter((w) =>
    w.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page">
      <NavBar />
      <div className="card">
        <header className="header">
          <h1 className="title">Workout Logger</h1>
          <div className="control">
            <div className="search">
              <FiSearch />
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              className="filter"
              onClick={() => {
                /* show filter */
              }}
            >
              {filter} <FiChevronDown />
            </button>
          </div>
        </header>

        <div className="listHeader">
          <div>Workout</div>
          <div>Date</div>
        </div>

        <button className="addButton" onClick={openNewWorkoutModal}>
          <FiPlus /> Add Workout
        </button>

        <ul className="list">
<<<<<<< HEAD
          {filtered.map((w) => (
=======
          {workouts.map(w => (
>>>>>>> origin/main
            <li key={w.id} className="listItem">
              <div className="workoutInfo">
                <div className="workoutTitle">{w.title}</div>
                <div className="workoutDesc">
                  {w.exercises.map((ex, i) => (
                    <div key={i}>
                      {ex.exercise}: {ex.sets}×{ex.reps}
                    </div>
                  ))}
                </div>
              </div>
              <div className="workoutDate">{w.date}</div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="modalOverlay">
          <div className="modal">
            <header className="modalHeader">
              <button
                className="closeButton"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
              <input
                className="modalTitleInput"
                value={newWorkout.title}
                onChange={(e) =>
                  setNewWorkout((w) => ({ ...w, title: e.target.value }))
                }
              />
            </header>

            <form className="modalForm" onSubmit={saveWorkout}>
              <div className="exerciseRow">
                <label>
                  Exercise
                  <select
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                  >
                    {EXERCISES.map((ex) => (
                      <option key={ex} value={ex}>
                        {ex}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Sets
                  <input
                    type="number"
                    min={1}
                    value={sets}
                    onChange={(e) => setSets(+e.target.value || 1)}
                  />
                </label>

                <label>
                  Reps
                  <input
                    type="number"
                    min={1}
                    value={reps}
                    onChange={(e) => setReps(+e.target.value || 1)}
                  />
                </label>

                <button
                  type="button"
                  onClick={addExercise}
                  className="addButton"
                >
                  + Add Exercise
                </button>
              </div>
              <ul className="exerciseList">
                {newWorkout.exercises.map((ex, i) => (
                  <li key={i}>
                    {ex.exercise}: {ex.sets}×{ex.reps}
                  </li>
                ))}
              </ul>
              <button type="submit" className="saveButton">
                Save Workout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
