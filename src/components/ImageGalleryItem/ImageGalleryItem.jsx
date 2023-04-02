import css from './ImageGalleryItem.module.css';

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
