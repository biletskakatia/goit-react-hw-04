import css from "./ImageCard.module.css"
export default function ImageCard({ image, onClick }) {
return (
    <div onClick={() => onClick(image)} className={css.div}>
    <img src={image.urls.small} alt={image.alt_description}  className={css.img}/>
    </div>
);
}