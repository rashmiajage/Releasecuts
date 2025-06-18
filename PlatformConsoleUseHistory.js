import React from "react";
import { useHistory } from "react-router-dom";
import "./PlatformConsole.css";

const features = [
  {
    title: "Security Scans",
    description: "Run and view security checks across environments.",
    path: "/platform/security-scans",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="blue">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v2m0-6v2m0 4h.01M5.5 17.5a9 9 0 0113 0M3 12c0-4.418 3.582-8 8-8s8 3.582 8 8a8 8 0 11-16 0z" />
      </svg>
    ),
  },
  {
    title: "Deployment Info",
    description: "View deployment metadata and history.",
    path: "/platform/deployment-info",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="green">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16h8M8 12h8M9 8h6" />
      </svg>
    ),
  },
  {
    title: "Release Cut Automation",
    description: "Automate release branching and versioning.",
    path: "/platform/release-cut",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="purple">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 3v6m0 6v6m12-12v12M6 9h6a6 6 0 006-6" />
      </svg>
    ),
  },
  {
    title: "Environment Health Check",
    description: "Monitor health of services in real-time.",
    path: "/platform/environment-health",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="red">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h3l3 8 4-16 3 8h4" />
      </svg>
    ),
  },
];

const PlatformConsole = () => {
  const history = useHistory();

  return (
    <div className="platform-console">
      <h1 className="title">Platform Console</h1>
      <p className="description">
        The Platform Console provides a centralized interface for developers and platform engineers
        to manage deployment workflows, perform security checks, and monitor environment health — 
        all from one unified dashboard.
      </p>

      <div className="card-grid">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="card"
            onClick={() => history.push(feature.path)}
          >
            <div className="card-icon">{feature.icon}</div>
            <div className="card-content">
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformConsole;
