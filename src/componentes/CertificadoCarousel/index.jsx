import { useState } from 'react';
import './index.css';
import ImageModal from '../ImageModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';





function CertificadoCarousel({ general }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };


    return (
        <div className="">
            <div className="container">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    centeredSlides={true}
                    grabCursor={true}
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    className="mySwiperDestiny"
                >
                    {
                        general.images.map((certificados) => (
                            <SwiperSlide key={certificados.id}>
                                <img
                                    src={certificados.nombre}
                                    className='slider-image-home'
                                    onClick={() => handleImageClick(certificados.nombre)}
                                    alt="Nature"
                                />
                            </SwiperSlide>
                        )
                        )
                    }
                </Swiper>
            </div>
            <ImageModal isOpen={modalOpen} imageUrl={selectedImage} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default CertificadoCarousel;
