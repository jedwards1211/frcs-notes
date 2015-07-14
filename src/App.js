'use strict';

import React from 'react';
import Router from 'react-router';

import Collapse from './Collapse';

require('./App.sass');

export default React.createClass({
  mixins: [Router.Navigation, Router.State],
  contextTypes: {
    tripStore: React.PropTypes.object.isRequired,
  },
  getInitialState() {
    return {
      searching: false,
      trips: this.context.tripStore.find(),
    };
  },
  onInputKeyDown(e) {
    if (e.key === 'Enter') {
      var query = this.getQuery();
      query.q = React.findDOMNode(this.refs.search).value;
      this.transitionTo(this.getPathname(), this.getParams(), query);
    }
  },
  componentDidMount() {
    if (this.props.query.q) {
      this.componentWillReceiveProps(this.props);
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.currentQuery !== nextProps.query.q) {
      this.currentQuery = nextProps.query.q;
      this.setState({
        searching: true,
      }, () => {
        this.setState({
          searching: false,
          trips: this.context.tripStore.find(nextProps.query.q),
        });
      });      
    }
  },
  onPanelHeaderClick(key, e) {
    if (this.openPanel && this.openPanel.isMounted()) {
      this.openPanel.hide();
    }
    this.openPanel = this.refs[key];
    this.openPanel.show();
  },
  render() {
    var {searching, trips} = this.state;

    var panels = [];
    trips.forEach(trip => {
      if (trip) {
        var tripNum = String(trip.tripNum);
        panels.push(<div key={tripNum} className="panel panel-default">
          <div className="panel-heading" onClick={this.onPanelHeaderClick.bind(this, tripNum)}>
            <div className="trip-num"><a href={trip.notesfile}>{tripNum}</a></div>
            <div className="trip-name"><a href={window.config.notesPath + trip.notesfile}>{trip.name}</a></div>
          </div>
          <Collapse initOpen={false} component="div" ref={tripNum} className="panel-body">
            <p><strong>Surveyors: </strong>{trip.surveyors && trip.surveyors.join(', ')}</p>
            <p><strong>Date: </strong>{trip.date && trip.date.toString().substring(0, 10)}</p>
          </Collapse>
        </div>);
      }
    });

    return <div className="app">
      <input ref="search" className="form-control" placeholder="Search for trips!" 
        defaultValue={this.props.query.q} onKeyDown={this.onInputKeyDown} />
      {searching ?
        <div className="alert alert-info">Searching...</div>
        :
        <div className="search-results">
          {panels}
        </div>}
    </div>;
  }
});