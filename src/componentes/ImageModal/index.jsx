import './index.css'
const ImageModal = ({ isOpen, imageUrl, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="lightbox-certificados" onClick={onClose}>
            <img src={imageUrl} alt="Enlarged pic" style={{ maxHeight: '90%', maxWidth: '90%' }} />
        </div>
    );
};

export default ImageModal;
