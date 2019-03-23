import React, { Component } from 'react';

import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { logout } from '../actions/AuthActions';

import { allEntries, sortNew } from '../actions/EntryActions';

import moment from 'moment';

import Entries from './entries/AllEntries';
import Nav from './Nav';
import LastDate from './lastEntryData';

import { FaSort } from 'react-icons/fa';
// import ReactDOM from 'react-dom';
const today = moment(Date.now()).format('MMMM D YYYY');

class HomePage extends Component {
  state = {
    offset: 0,
    sorted: false,
  };

  componentDidMount() {
    this.props.allEntries();

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = e => {
    this.setState({ offset: window.pageYOffset });
  };

  /** Grab last entry's date **/
  lastCreated(ent) {
    let l = ent[ent.length - 1];

    if (l) {
      const lastEntry = moment(l.createdOn).format('MMM D');

      return lastEntry;
    } else {
      return 'No entries';
    }
  }
  /*************************/

  sortDate(entries) {
    this.props.sortNew(entries);

    this.setState({ sorted: true });
    this.forceUpdate();
  }

  render() {
    const { entries, usersentries } = this.props;

    // console.log(this.props.history);
    console.log(this.state.sorted);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexFlow: 'column',
        }}
      >
        <Nav history={this.props.history} />

        <div className={this.state.offset === 0 ? 'no_shadow' : 'shadow'}>
          <p>{today}</p>
          <div className="content-sort" onClick={() => this.sortDate(entries)}>
            <p>Change order</p>
            <FaSort style={{ marginTop: '2px' }} />
          </div>
        </div>

        <div className="content">
          <div style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}>
            <p style={{ color: '#a2daff' }}>
              <span style={{ fontWeight: 'bold', color: '#333333' }}>
                Total entries:
              </span>{' '}
              {entries.length}
            </p>

            <LastDate lastDate={this.lastCreated} entries={entries} />
          </div>

          <div className="content-list">
            {/* {entries ? ( */}
            {entries.map((e, i) => {
              /**Date formatting */
              const day = moment(e.createdOn).format('dddd');
              const date = moment(e.createdOn).format('D');
              const month = moment(e.createdOn).format('MMM');
              /**************** */

              return (
                <Entries
                  key={i}
                  title={e.title}
                  body={e.content}
                  label={e.label}
                  day={day}
                  date={date}
                  month={month}
                  id={e._id}
                />
              );
            })}
            {/* ) : (
              <p> loading</p>
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    user: state.auth.user,
    entries: state.journal.entries,
    usersentries: state.auth.user_entries,
  };
};

export default connect(
  mapStateToprops,
  { logout, allEntries, sortNew }
)(HomePage);
