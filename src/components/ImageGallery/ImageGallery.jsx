import ImageCard from '../ImageCard/ImageCard';
import css from "./ImageGallery.module.css"

export default function ImageGallery ({ images, onImageClick }) {
return (
    <ul className={css.ul}>
    {images.map((image) => (
        <li key={image.id} className={css.li}>
        <ImageCard image={image} onClick={() => onImageClick(image)} className={css.img} />
        </li>
    ))}
    </ul>
);
}
