import axios from "axios";
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import css from "./App.module.css";

export default function App() {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const API_KEY = 'SJ6snw77CJwytvbf4Tc46YIKX0ibzP75XUOe5hkPcps';
    const BASE_URL = 'https://api.unsplash.com/search/photos';

    useEffect(() => {
        if (query === '') return;
        const fetchImages = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BASE_URL}?query=${query}&page=${page}&per_page=12&client_id=${API_KEY}`);
                setImages(prevImages => [...prevImages, ...response.data.results]);
            } catch (error) {
                setError('Failed to fetch images. Please try again');
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, [query, page]);

    const handleSearchSubmit = (newQuery) => {
        if (newQuery === query) {
            toast.error('You are already viewing results for this query');
            return;
        }
        setQuery(newQuery);
        setImages([]);
        setPage(1);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <Toaster ClassName={css.tost} />
            <SearchBar onSubmit={handleSearchSubmit} />
            {error && <ErrorMessage message={error} />}
            <ImageGallery images={images} onImageClick={handleImageClick} />
            {isLoading && <Loader />}
            {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
            {selectedImage && (
                <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage} />
            )}
        </div>
    );
}
