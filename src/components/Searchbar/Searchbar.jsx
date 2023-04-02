import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const text = e.target[1].value;
    if (text.trim() === '') {
      alert('Ваш запит не повинен бути порожній');
      return;
    }

    this.props.liftData(text);
    e.target.reset();
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button
            name="button"
            type="submit"
            className={css['SearchForm-button']}
          >
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            onChange={this.onInput}
            name="input"
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  liftData: PropTypes.func,
};
