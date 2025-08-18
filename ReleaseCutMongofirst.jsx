import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ReleaseDashboard.css";

class ReleaseDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [
        {
          name: "cvams-orchestrator",
          snapshotStatus: "success",
          snapshotLink: "http://example.com/snapshot1",
          releaseStatus: "success",
          releaseLink: "http://example.com/release1",
          miStatus: "success",
          miLink: "http://example.com/mi1",
          overallStatus: "success",
          progress: 100,
        },
        {
          name: "cvams-chat-data-service",
          snapshotStatus: "failed",
          snapshotLink: "http://example.com/snapshot2",
          releaseStatus: "inprogress",
          releaseLink: "http://example.com/release2",
          miStatus: "failed",
          miLink: "http://example.com/mi2",
          overallStatus: "inprogress",
          progress: 65,
        },
        {
          name: "cvams-ui",
          snapshotStatus: "inprogress",
          snapshotLink: "http://example.com/snapshot3",
          releaseStatus: "success",
          releaseLink: "http://example.com/release3",
          miStatus: "success",
          miLink: "http://example.com/mi3",
          overallStatus: "failed",
          progress: 30,
        },
      ],
    };
  }

  getStatusColor(status) {
    switch (status) {
      case "success":
        return "green";
      case "failed":
        return "red";
      case "inprogress":
        return "orange";
      default:
        return "gray";
    }
  }

  renderStatusRow(label, status, link) {
    return (
      <div className="status-row">
        <span
          className="status-dot"
          style={{ backgroundColor: this.getStatusColor(status) }}
        ></span>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {label} Link
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Release Dashboard</h2>
        <div className="card-grid">
          {this.state.components.map((comp, idx) => (
            <div
              key={idx}
              className="status-card"
              style={{
                borderLeft: `10px solid ${this.getStatusColor(
                  comp.overallStatus
                )}`,
              }}
            >
              <div className="card-header">
                <h3 className="card-title">{comp.name}</h3>
                <div className="progress-small">
                  <CircularProgressbar
                    value={comp.progress}
                    text={`${comp.progress}%`}
                    styles={buildStyles({
                      textColor: "#333",
                      pathColor: this.getStatusColor(comp.overallStatus),
                    })}
                  />
                </div>
              </div>

              {this.renderStatusRow("MI", comp.miStatus, comp.miLink)}
              {this.renderStatusRow("Snapshot", comp.snapshotStatus, comp.snapshotLink)}
              {this.renderStatusRow("Release", comp.releaseStatus, comp.releaseLink)}
            </div>
          ))}
        </div>

        <div className="status-legend">
          <span>
            <span className="legend-dot success"></span> Success
          </span>
          <span>
            <span className="legend-dot failed"></span> Failed
          </span>
          <span>
            <span className="legend-dot inprogress"></span> In Progress
          </span>
        </div>
      </div>
    );
  }
}

export default ReleaseDashboard;
