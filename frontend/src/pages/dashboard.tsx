import React from "react";
import SideBar from "../components/SideBar";
import DashBoxes from "../components/DashBoxes";

const Dashboard: React.FC = () => {
  return (
    <div>
      <SideBar />
      <DashBoxes />
    </div>
  );
};

export default Dashboard;
