import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, onChange, index }) => {
  return (
    <li className={css['ImageGalleryItem']}>
      <img
        index={index}
        onClick={onChange}
        className={css['ImageGalleryItem-image']}
        src={src}
        alt={alt}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onChange: PropTypes.func,
  index: PropTypes.number,
};
