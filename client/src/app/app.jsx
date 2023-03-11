import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { Tabs } from "./components/Tabs";
import "./app.css";

const GET_ALL_JOBS = "http://localhost:8000/jobs";
const GET_CATEGORIES = "http://localhost:8000/categories";
const GET_SUBURBS = "http://localhost:8000/suburbs";

const App = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suburbs, setSuburbs] = useState([]);
  const [currentTab, setCurrentTab] = useState("invited");

  useEffect(() => {
    Promise.all([
      fetch(GET_ALL_JOBS),
      fetch(GET_CATEGORIES),
      fetch(GET_SUBURBS),
    ])
      .then((responses) => {
        return Promise.all(
          responses.map((response) => {
            return response.json();
          })
        );
      })
      .then((data) => {
        const [jobs, categories, suburbs] = data;
        setAllJobs(jobs);
        setCategories(categories);
        setSuburbs(suburbs);
        updateDisplayedJobs(jobs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function showAccepted() {
    const getAcceptedJobs = allJobs.filter((job) => job.status === "accepted");
    setDisplayJobs(getAcceptedJobs);
    setCurrentTab("accepted");
  }

  function showInvited() {
    const invitedJobs = allJobs.filter(
      (job) => job.status === "new" || job.status === "declined"
    );
    setDisplayJobs(invitedJobs);
    setCurrentTab("invited");
  }

  function declineJob(id) {
    fetch(`http://localhost:8000/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "declined" }),
    }).then(async () => {
      let response = await fetch(GET_ALL_JOBS);
      if (response.status === 200) {
        let data = await response.json();
        setAllJobs(data);
        updateDisplayedJobs(data);
      }
    });
  }

  function acceptJob(id) {
    fetch(`http://localhost:8000/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accepted" }),
    }).then(async () => {
      let response = await fetch(GET_ALL_JOBS);
      if (response.status === 200) {
        let data = await response.json();
        setAllJobs(data);
        updateDisplayedJobs(data);
      }
    });
  }

  function updateDisplayedJobs(jobs) {
    setDisplayJobs(
      jobs.filter((job) => job.status === "new" || job.status === "declined")
    );
  }

  return (
    <div className="App">
      <Tabs
        currentTab={currentTab}
        showAccepted={showAccepted}
        showInvited={showInvited}
      />
      <div className="cards">
        {displayJobs &&
          displayJobs.map((job) => {
            return (
              <Card
                key={job.id}
                job={job}
                categories={categories}
                suburbs={suburbs}
                acceptJob={acceptJob}
                declineJob={declineJob}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;
