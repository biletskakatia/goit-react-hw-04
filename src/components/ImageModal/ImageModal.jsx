import { useEffect } from 'react';
import Modal from 'react-modal';

export default function ImageModal({ isOpen, onRequestClose, image }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onRequestClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onRequestClose]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '0',
                    border: 'none',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }
            }}
        >
            <img src={image.urls.regular} alt={image.alt_description} style={{ display: 'block', maxWidth: '100%' }} />
            <div style={{ padding: '10px' }}>
            </div>
        </Modal>
    );
}
