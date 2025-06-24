import React, { Component } from 'react';
import './ReleaseStatus.css';

class ReleaseStatus extends Component {
  render() {
    const data = [
      { name: 'App-A', version: 'v1.2.5', status: 'Completed', percent: 100, time: '12:45 PM', links: ['View Release Log', 'Jenkins Job'] },
      { name: 'App-B', version: 'v1.2.5', status: 'In Progress', percent: 70, time: '12:43 PM', links: ['View Progress', 'Jenkins Job'] },
      { name: 'App-C', version: 'v1.2.5', status: 'Pending', percent: 0, time: '12:40 PM', links: ['Jenkins Job', 'Jenkins Job'] },
      { name: 'App-D', version: 'v1.2.5', status: 'Failed', percent: 45, time: '12:30 PM', links: ['View Error Log', 'Jenkins Job'] }
    ];

    return (
      <div className="release-wrapper">
        <h2>Release Cut Status</h2>
        <div className="grid">
          {data.map((item, i) => (
            <div className="card" key={i}>
              <div className="header">
                <span className="app-name">{item.name}</span>
                <span className="version">({item.version})</span>
              </div>
              <div className="progress-ring">
                <div className={`circle ${item.status.replace(/\s/g, '').toLowerCase()}`}>
                  <div className="percent">{item.percent}%</div>
                </div>
              </div>
              <div className="details">
                <div>Status: <strong>{item.status}</strong></div>
                <div>Updated: {item.time}</div>
              </div>
              <div className="links">
                {item.links.map((link, j) => (
                  <a href="#" key={j}>{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ReleaseStatus;
