import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className={css['ImageGalleryItem']}>
      <img className={css['ImageGalleryItem-image']} src={src} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
