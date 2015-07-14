'use strict';

import React from 'react';

export default React.createClass({
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
      this.setState({
        searching: true,
      }, () => {
        this.setState({
          searching: false,
          trips: this.context.tripStore.find(React.findDOMNode(this.refs.search).value),
        });
      });
    }
  },
  render() {
    var {searching, trips} = this.state;

    var rows = [];
    trips.forEach(trip => {
      if (trip) {
        var tripNum = trip.tripNum;
        rows.push(<tr key={tripNum}>
          <td className="trip-num"><a href={trip.notesfile}>{tripNum}</a></td>
          <td className="trip-name"><a href={trip.notesfile}>{trip.name}</a></td>
          <td className="trip-date"><a href={trip.notesfile}>{trip.date && trip.date.toString().substring(0, 10)}</a></td>
        </tr>);
      }
    });

    return <div>
      <input ref="search" className="form-control" onKeyDown={this.onInputKeyDown} />
      {searching ?
        <div className="alert alert-info">Searching...</div>
        :
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
            {rows}
          </tbody>
        </table>}
    </div>;
  }
});