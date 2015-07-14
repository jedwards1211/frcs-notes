'use strict';

import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute, RouteHandler} from 'react-router';
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
    return <RouteHandler {...this.props} />;
  }
});

var Routes = (
  <Route name="/" handler={AppWrapper}>
    <DefaultRoute handler={App} />
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});
