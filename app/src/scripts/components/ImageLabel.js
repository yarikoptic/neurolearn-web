import React, { PropTypes } from 'react';

export default class ImageLabel extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        <h3>{item.name}</h3>
        <p style={{marginRight: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.collectionName}</p>
      </div>
    );
  }
}
