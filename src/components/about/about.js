import React, { Component } from 'react';

import './about.scss';

export default class Main extends Component {
  render() {
    const about = 'About';
    return (
      <div className="about">
        <div className="center-content">
          <h1>{about}</h1>
        </div>
      </div>
    );
  }
}
