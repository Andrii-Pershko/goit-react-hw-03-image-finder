import css from './Modal.module.css';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('clicl');
        this.props.toglleModal();
        window.removeEventListener('keydown');
      }
    });
  }
  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <button
            className={css.Button}
            type="button"
            onClick={this.props.toglleModal}
          ></button>
          <img src={largeImageURL.largeImageURL} alt={largeImageURL.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
