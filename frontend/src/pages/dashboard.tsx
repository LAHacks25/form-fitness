import React from "react";
import SideBar from "../components/SideBar";
import DashBoxes from "../components/DashBoxes";

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: "14%" }}>
        <SideBar />
      </div>
      <div style={{ width: "86%", margin: 0, padding: 0 }}>
        <DashBoxes />
      </div>
    </div>
  );
};

export default Dashboard;
