import css from './Button.module.css';

export const Button = ({ onChange }) => {
  return (
    <button type="button" onClick={onChange} className={css.Button}>
      Load more
    </button>
  );
};
