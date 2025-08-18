import React, { Component } from "react";
import { Progress, Card } from "antd";
import "antd/dist/antd.css";

class ReleaseDashboard extends Component {
  state = {
    components: [
      {
        component: "cvams-orchestrator",
        snapshotstatus: "success",
        releasestatus: "success",
        snapshotlink: "https://jenkins-link1",
        releaselink: "https://jenkins-link2",
        rcstatus: "success",
        miurl: "https://jenkins-mi-link1",
        overallStatus: "success",
        progress: 100,
      },
      {
        component: "cvams-chat-data-service",
        snapshotstatus: "failed",
        releasestatus: "in-progress",
        snapshotlink: "https://jenkins-link3",
        releaselink: "https://jenkins-link4",
        rcstatus: "failed",
        miurl: "https://jenkins-mi-link2",
        overallStatus: "in-progress",
        progress: 65,
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
        return "gold"; // yellow
      default:
        return "grey";
    }
  };

  renderStatusRow = (label, status, link) => (
    <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <b>{label}:</b>
      {/* Dot */}
      <span
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: this.getStatusColor(status),
        }}
      ></span>
      <span>{status}</span>
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          Jenkins Link
        </a>
      )}
    </p>
  );

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Release Dashboard</h2>

        {/* Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {this.state.components.map((comp, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              {/* Left Status Strip */}
              <div
                style={{
                  width: "10px",
                  backgroundColor: this.getStatusColor(comp.overallStatus),
                }}
              ></div>

              {/* Card Content */}
              <Card
                title={comp.component}
                style={{ flex: 1, border: "none" }}
                bodyStyle={{ padding: "15px" }}
              >
                {this.renderStatusRow(
                  "Snapshot Status",
                  comp.snapshotstatus,
                  comp.snapshotlink
                )}
                {this.renderStatusRow(
                  "Release Status",
                  comp.releasestatus,
                  comp.releaselink
                )}
                {this.renderStatusRow("MI Status", comp.rcstatus, comp.miurl)}

                <div style={{ textAlign: "center", marginTop: "15px" }}>
                  <Progress
                    type="circle"
                    percent={comp.progress}
                    strokeColor={this.getStatusColor(comp.overallStatus)}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Legend Section */}
        <div style={{ marginTop: "30px" }}>
          <h3>Status Legend</h3>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
              ></span>
              Success
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              ></span>
              Failed
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "gold",
                }}
              ></span>
              In Progress
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ReleaseDashboard;
