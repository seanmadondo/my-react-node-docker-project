import React, { useState, useEffect } from "react";
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

  function processDateString(date) {
    const newDate = new Date(date);
    return newDate.toDateString();
  }

  return (
    <div className="App">
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
      <div className="cards">
        {displayJobs &&
          displayJobs.map((job) => {
            return (
              <div className="card" key={job.id}>
                <section className="card-header">
                  <h4>{job.contact_name}</h4>
                  <p>{processDateString(job.created_at)}</p>
                </section>
                <section className="card-body">
                  <p>
                    {suburbs.length > 0 &&
                      suburbs.find((suburb) => suburb.id === job.suburb_id)
                        .name}
                  </p>
                  <p>
                    {categories.length > 0 &&
                      categories.find(
                        (category) => category.id === job.category_id
                      ).name}
                  </p>
                  <p>{`Job ID: ${job.id}`}</p>
                  {job.status === "accepted" && (
                    <div className="lead-info">
                      <h4>{`$${job.price}`}</h4>
                      <p>Lead Invitation</p>
                    </div>
                  )}
                </section>
                <section className="card-footer">
                  {job.status === "accepted" && (
                    <div className="footer-contact-details">
                      <h4>{job.contact_phone}</h4>
                      <h4>{job.contact_email}</h4>
                    </div>
                  )}
                </section>
                <p>{job.description}</p>
                {job.status === "new" && (
                  <section className="card-actions">
                    <button
                      className="accept-button"
                      onClick={() => acceptJob(job.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="decline-button"
                      onClick={() => declineJob(job.id)}
                    >
                      Decline
                    </button>
                    <div className="lead-info">
                      <h4>{`$${job.price}`}</h4>
                      <p>Lead Invitation</p>
                    </div>
                  </section>
                )}
                {job.status === "declined" && (
                  <p className="declined-message">DECLINED</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
