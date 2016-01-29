import React, { PropTypes } from 'react';

const TaskStateLabel = props => {
  switch (props.state) {
    case 'queued':
      return <span className="badge" style={{'backgroundColor': 'gray'}}>Queued</span>;
    case 'progress':
      return <span className="badge" style={{'backgroundColor': '#E48110'}}>In Progress…</span>;
    case 'success':
      return <span className="badge" style={{'backgroundColor': 'green'}}>Complete</span>;
    case 'failure':
      return <span className="badge" style={{'backgroundColor': '#DC0000'}}>Failed</span>;
  }
};

TaskStateLabel.PropTypes = {
  state: PropTypes.string
};

export default TaskStateLabel;
