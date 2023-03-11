import React from "react";
import "./Tabs.css";

export const Tabs = ({ currentTab, showAccepted, showInvited }) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${currentTab === "invited" && "active"}`}
        onClick={showInvited}
      >
        Invited
      </button>
      <button
        className={`tab ${currentTab === "accepted" && "active"}`}
        onClick={showAccepted}
      >
        Accepted
      </button>
    </div>
  );
};
