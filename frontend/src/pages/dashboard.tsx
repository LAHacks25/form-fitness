import React from "react";
import SideBar from "../components/SideBar";
import DashBoxes from "../components/DashBoxes";

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "14%" }}>
        <SideBar />
      </div>
      <div style={{ width: "86%" }}>
        <DashBoxes />
      </div>
    </div>
  );
};

export default Dashboard;
