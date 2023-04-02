import css from './Button.module.css';
import { RotatingLines } from 'react-loader-spinner';

export const Button = ({ onChange }) => {
  return (
    <button type="button" onClick={onChange} className={css.Button}>
      Load more
    </button>
  );
};
