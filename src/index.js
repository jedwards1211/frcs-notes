'use strict';

import React from 'react';
import App from './App';

import TripStore from './TripStore';

// window.tripSummaries is provided by an auto-generated JS script
// included in index.html
window.tripSummaries.forEach((trip, tripNum) => {
  if (trip) trip.tripNum = tripNum;
});

var tripStore = new TripStore(window.tripSummaries);

var AppWrapper = React.createClass({
  childContextTypes: {
    tripStore: React.PropTypes.object.isRequired,
  },
  getChildContext() {
    return {
      tripStore: tripStore,
    };
  },
  render() {
    return <App />;
  }
});

React.render(<AppWrapper />, document.getElementById('root'));
