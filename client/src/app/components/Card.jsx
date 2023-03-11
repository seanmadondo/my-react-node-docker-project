import React from "react";
import { processDateString } from "../utils";
import "./Card.css";

export const Card = ({ job, suburbs, categories, acceptJob, declineJob }) => {
  return (
    <div className="card" key={job.id}>
      <section className="card-header">
        <h4>{job.contact_name}</h4>
        <p>{processDateString(job.created_at)}</p>
      </section>
      <section className="card-body">
        <p>
          {suburbs.length > 0 &&
            suburbs.find((suburb) => suburb.id === job.suburb_id).name}
        </p>
        <p>
          {categories.length > 0 &&
            categories.find((category) => category.id === job.category_id).name}
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
          <button className="accept-button" onClick={() => acceptJob(job.id)}>
            Accept
          </button>
          <button className="decline-button" onClick={() => declineJob(job.id)}>
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
};
