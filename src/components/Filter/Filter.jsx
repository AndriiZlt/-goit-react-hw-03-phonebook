import PropTypes from 'prop-types';
import React from 'react';
import css from './Filter.module.css';

class Filter extends React.Component {
  filterChangeHandler = e => {
    const { name, value } = e.currentTarget;
    this.props.appChangeHandler(name, value);
  };

  render() {
    return (
      <label className={css.label}>
        Find contacts by name:
        <input
          type="text"
          name="filter"
          value={this.props.filter}
          onChange={this.filterChangeHandler}
          className={css.input}
          placeholder="Filter by.."
        />
      </label>
    );
  }
}

export default Filter;

Filter.propTypes = {
  appChangeHandler: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
