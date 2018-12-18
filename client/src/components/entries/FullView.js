import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { oneEntry } from '../../actions/EntryActions';

import Entry from './Entry';
import Edit from './Edit';

class FullView extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;

    this.props.oneEntry(id);
  }

  render() {
    const { entry } = this.props;
    console.log(entry);
    return (
      <div>
        {entry ? (
          <div>
            <Entry
              id={entry._id}
              title={entry.title}
              body={entry.content}
              createdOn={entry.createdOn}
              label={entry.label}
              history={this.props.history}
            />
            <Link to={`/edit/${entry._id}`}>edit</Link>
          </div>
        ) : null}{' '}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    entry: state.journal.entry_view,
  };
};
export default connect(
  mapStateToProps,
  { oneEntry }
)(FullView);