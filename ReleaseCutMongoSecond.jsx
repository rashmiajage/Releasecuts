import React, { Component } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ReleaseHub.css";

class ReleaseHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [],
      loading: true,
      lastUpdated: null,
      refreshing: false,
    };
    this.pollingInterval = null;
  }

  componentDidMount() {
    this.fetchData();
    // Poll every 15 seconds
    this.pollingInterval = setInterval(this.fetchData, 15000);
  }

  componentWillUnmount() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  fetchData = () => {
    this.setState({ refreshing: true });
    axios
      .post("http://localhost:8080/api/releases", { release: "v1.0" })
      .then((res) => {
        this.setState({
          components: res.data,
          loading: false,
          lastUpdated: new Date().toLocaleTimeString(),
          refreshing: false,
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        this.setState({ loading: false, refreshing: false });
      });
  };

  getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "green-dot";
      case "failed":
        return "red-dot";
      case "inprogress":
        return "yellow-dot";
      default:
        return "gray-dot";
    }
  };

  getOverallColor = (status) => {
    switch (status) {
      case "success":
        return "overall-success";
      case "failed":
        return "overall-failed";
      case "inprogress":
        return "overall-inprogress";
      default:
        return "overall-unknown";
    }
  };

  render() {
    const { components, loading, lastUpdated, refreshing } = this.state;

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <div className="release-container">
        <h2 className="title">Release Hub - Cut, Trigger & Track with Ease</h2>

        <div className="header-info">
          <div className="legend">
            <span className="legend-item">
              <span className="dot green-dot"></span> Success
            </span>
            <span className="legend-item">
              <span className="dot red-dot"></span> Failed
            </span>
            <span className="legend-item">
              <span className="dot yellow-dot"></span> In Progress
            </span>
          </div>
          <div className="refresh-section">
            {lastUpdated && (
              <span className="last-updated">
                Last Updated: {lastUpdated}
              </span>
            )}
            <button
              className="refresh-button"
              onClick={this.fetchData}
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="grid">
          {components.map((comp, index) => (
            <div key={index} className={`card ${this.getOverallColor(comp.overallStatus)}`}>
              <div className="card-header">{comp.name}</div>

              <div className="card-body">
                <div className="status-row">
                  <span className={`dot ${this.getStatusColor(comp.miStatus)}`}></span>
                  <a href={comp.miLink} target="_blank" rel="noreferrer">MI Link</a>
                </div>

                <div className="status-row">
                  <span className={`dot ${this.getStatusColor(comp.snapshotStatus)}`}></span>
                  <a href={comp.snapshotLink} target="_blank" rel="noreferrer">Snapshot Link</a>
                </div>

                <div className="status-row">
                  <span className={`dot ${this.getStatusColor(comp.releaseStatus)}`}></span>
                  <a href={comp.releaseLink} target="_blank" rel="noreferrer">Release Link</a>
                </div>
              </div>

              <div className="progress-container">
                <CircularProgressbar
                  value={comp.progress}
                  text={`${comp.progress}%`}
                  styles={buildStyles({
                    textSize: "28px",
                    pathColor:
                      comp.overallStatus === "success"
                        ? "green"
                        : comp.overallStatus === "failed"
                        ? "red"
                        : "orange",
                    textColor: "#333",
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ReleaseHub;
