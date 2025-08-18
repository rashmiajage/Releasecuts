import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ReleaseDashboard.css"; // ✅ custom CSS file

class ReleaseDashboard extends Component {
  state = {
    components: [
      {
        component: "cvams-orchestrator",
        snapshotstatus: "success",
        releasestatus: "success",
        rcstatus: "success",
        overallStatus: "success",
        progress: 100,
      },
      {
        component: "cvams-chat-data-service",
        snapshotstatus: "failed",
        releasestatus: "in-progress",
        rcstatus: "failed",
        overallStatus: "in-progress",
        progress: 65,
      },
      {
        component: "cvams-ui",
        snapshotstatus: "in-progress",
        releasestatus: "success",
        rcstatus: "success",
        overallStatus: "failed",
        progress: 30,
      },
    ],
  };

  getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "green";
      case "failed":
        return "red";
      case "in-progress":
        return "gold";
      default:
        return "grey";
    }
  };

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
              <h3 className="card-title">{comp.component}</h3>

              <p>
                Snapshot Status:
                <span
                  className="status-dot"
                  style={{ background: this.getStatusColor(comp.snapshotstatus) }}
                ></span>
                {comp.snapshotstatus}
              </p>

              <p>
                Release Status:
                <span
                  className="status-dot"
                  style={{ background: this.getStatusColor(comp.releasestatus) }}
                ></span>
                {comp.releasestatus}
              </p>

              <p>
                MI Status:
                <span
                  className="status-dot"
                  style={{ background: this.getStatusColor(comp.rcstatus) }}
                ></span>
                {comp.rcstatus}
              </p>

              <div className="progress-container">
                <CircularProgressbar
                  value={comp.progress}
                  text={`${comp.progress}%`}
                  styles={buildStyles({
                    textColor: "#333",
                    pathColor: this.getStatusColor(comp.overallStatus),
                    trailColor: "#eee",
                  })}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="legend-container">
          <h3>Status Legend</h3>
          <div className="legend-items">
            <span className="legend-item">
              <span className="legend-dot success"></span> Success
            </span>
            <span className="legend-item">
              <span className="legend-dot failed"></span> Failed
            </span>
            <span className="legend-item">
              <span className="legend-dot in-progress"></span> In Progress
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ReleaseDashboard;
