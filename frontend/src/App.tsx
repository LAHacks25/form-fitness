import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import VideoFeed from "./components/VideoFile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoFeed />} />
      </Routes>
    </div>
  );
}

export default App;
