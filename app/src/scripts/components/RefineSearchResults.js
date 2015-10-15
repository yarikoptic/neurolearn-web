import React, { PropTypes } from 'react';

import update from 'react/lib/update';
import { isEmpty, omit } from 'lodash';
import { Input } from 'react-bootstrap';
import RangeFilter from './RangeFilter';
import TermsFilter from './TermsFilter';

export default class RefineSearchResults extends React.Component {
  static propTypes = {
    filter: PropTypes.object,
    results: PropTypes.object.isRequired,
    onChange: PropTypes.func
  }

  renderBuckets(buckets) {
    return buckets.map(bucket => <div>{bucket.key}: {bucket.doc_count}</div>);
  }

  handleRangeFilterChange(value) {
    const numberOfImages = {
      'range': {
        'number_of_images': {
          'gte': parseInt(value[0]),
          'lte': parseInt(value[1])
        }
      }
    };

    const newFilter = update(this.props.filter, {
      numberOfImages: {$set: numberOfImages}
    });

    this.props.onChange(newFilter);
  }

  _setDOI(filter) {
    const hasDOI = {
        'exists': {'field': 'DOI'}
    };

    return update(filter, {
      hasDOI: {$set: hasDOI}
    });
  }

  _unsetDOI(filter) {
    return omit(filter, 'hasDOI');
  }

  handleHasDOIChange(e) {
    const { checked } = e.target;
    const { filter } = this.props;
    const newFilter = checked ? this._setDOI(filter) : this._unsetDOI(filter);

    this.props.onChange(newFilter);
  }

  render() {
    const { results } = this.props;

    const imagesStats = results
      ? results.aggregations.number_of_images_stats :
      {max: 0, min: 0};

    const handedness = results
      ? results.aggregations.handedness.buckets :
      [];

    const hasDOI = results
      ? results.aggregations.has_DOI
      : null;

    const mapType = results
      ? results.aggregations.nested_aggs.map_type.buckets :
      [];

    const modality = results
      ? results.aggregations.nested_aggs.modality.buckets :
      [];

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <RangeFilter
            label="Number of images"
            value={[imagesStats.min, imagesStats.max]}
            onChange={this.handleRangeFilterChange.bind(this)}
          />

          { hasDOI && hasDOI.doc_count > 0 &&
            <Input
              type='checkbox'
              label={`Has DOI (${hasDOI.doc_count})`}
              onChange={(e) => this.handleHasDOIChange(e)}
            />
          }

          { !isEmpty(handedness)
            ? <TermsFilter
              label="Handedness"
              terms={handedness} />
            : false
          }

          { !isEmpty(mapType)
            ? <TermsFilter
              label="Map Type"
              disabled={true}
              terms={mapType} />
            : false
          }

          { !isEmpty(modality)
            ? <TermsFilter
              label="Modality"
              disabled={true}
              terms={modality} />
            : false
          }
        </div>
      </div>
    );
  }
}

