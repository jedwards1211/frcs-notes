'use strict';

import React from 'react';
import Router from 'react-router';
import Collapse from './Collapse';
import classNames from 'classnames';
import Spinner from './Spinner';

require('./App.sass');

var SearchField = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
  },
  getInitialState() {
    return {};
  },
  render() {
    return <div className="search">
      <input ref="search" className="form-control" placeholder="Search for trips!" 
        onChange={this.props.onChange}>
      </input>
      {this.state.searching && <Spinner/>}
    </div>;
  },
});

export default React.createClass({
  mixins: [Router.Navigation, Router.State],
  contextTypes: {
    tripStore: React.PropTypes.object.isRequired,
  },
  getInitialState() {
    return {
      trips: this.context.tripStore.find(),
    };
  },
  onSearchChange(e) {
    var query = e.target.value;
    var queryCount = this.queryCount = (this.queryCount || 0) + 1;

    clearTimeout(this.timeout);

    var doSearch = () => {
      this.refs.searchField.setState({searching: true}, () => {
        this.timeout = setTimeout(() => {
          if (this.queryCount === queryCount) {
            var trips = this.context.tripStore.find(query);
            if (this.queryCount === queryCount) {
              this.refs.searchField.setState({searching: false}, () => {
                this.setState({trips: trips});
              })
            }
          }
        }, 100);
      });
    };

    if (query) {
      doSearch();
    }
    else {
      this.timeout = setTimeout(doSearch, 1000);
    }
  },
  onPanelHeaderClick(key, e) {
    if (this.openPanel && this.openPanel.isMounted()) {
      this.openPanel.hide();
    }
    this.openPanel = this.refs[key];
    this.openPanel.show();
  },
  componentWillMount() {
  },
  componentWillUnmount() {
  },
  render() {
    var trips = this.state.trips;

    var panels = [];
    trips.forEach(trip => {
      if (trip) {
        var tripNum = String(trip.tripNum);
        panels.push(<div key={tripNum} className={classNames('panel', 'panel-default', {'notes-unavailable': !trip.notesfile})}>
          <div className="panel-heading" onClick={this.onPanelHeaderClick.bind(this, tripNum)}>
            <div className="trip-num">
              {trip.notesfile ? 
                <a href={window.config.notesPath + trip.notesfile}>{tripNum}</a> 
                : 
                tripNum}
            </div>
            <div className="trip-name">{trip.notesfile ? 
              <a href={window.config.notesPath + trip.notesfile}>{trip.name}</a>
              : 
              <span><strong>Notes unavailable</strong> {trip.name}</span>}
            </div>
          </div>
          <Collapse initOpen={false} component="div" ref={tripNum} className="panel-body">
            <div>
              <p><strong>Surveyors: </strong>{trip.surveyors && trip.surveyors.join(', ')}</p>
              <p><strong>Date: </strong>{trip.date && trip.date.toString().substring(0, 10)}</p>
            </div>
          </Collapse>
        </div>);
      }
    });

    return <div className="app">
      <div className="search-results">
        {panels}
      </div>
      <SearchField ref="searchField" onChange={this.onSearchChange} />
    </div>;
  }
});