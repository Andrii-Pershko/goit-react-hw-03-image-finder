import css from './Modal.module.css';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDon);
  }

  handleKeyDon = e => {
    if (e.code === 'Escape') {
      this.props.toglleModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDon);
  }

  overlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toglleModal();
    }
  };
  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.overlayClick}>
        <div className={css.Modal}>
          <button
            className={css.Button}
            type="button"
            onClick={this.props.toglleModal}
          ></button>
          <img
            width={900}
            height={600}
            src={largeImageURL.largeImageURL}
            alt={largeImageURL.tags}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toglleModal: PropTypes.func,
  largeImageURL: PropTypes.object,
};
