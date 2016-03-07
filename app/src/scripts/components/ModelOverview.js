import React, { PropTypes } from 'react';

import { algorithmNameMap } from '../constants/Algorithms';
import { pluralize } from '../utils.js';

import styles from './ModelOverview.scss';

const ModelOverview = ({model}) => (
  <div className={styles.root}>
    <div className="row">
        <div className="col-md-4 col-xs-12">
            <div className="attribute-label">Algorithm</div>
            <p>{algorithmNameMap[model.algorithm]}</p>
        </div>
        <div className="col-md-4 col-xs-12">
            <div className="attribute-label">Training Label</div>
            <p>{model.label_name}</p>
        </div>
        <div className="col-md-4 col-xs-12">
            <div className="attribute-label">Training Dataset</div>
            <p>{model.images_count} {pluralize(model.images_count, 'image', 'images')}</p>
        </div>
    </div>
  </div>
);

ModelOverview.propTypes = {
  model: PropTypes.object.isRequired
};

export default ModelOverview;
