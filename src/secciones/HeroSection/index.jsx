
import './index.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { useFetch } from '../../Hook/useFetch';
import { GeneralContext } from '../../context/general';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
function HeroSection() {


    const { general: GeneralData } = useContext(GeneralContext);
    const cabeceraTipo = GeneralData.cabecera.tipo;
    return (
        <>
            <div className='w-100 position-relative'>
                {cabeceraTipo == 0 ? (
                    <video src={GeneralData.cabecera.video} autoPlay loop muted className='video-home home-size'></video>
                ) : (
                    <Swiper
                        navigation={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper home-size"
                    >
                        {GeneralData.cabecera.images.map((images, index) => (
                            <SwiperSlide key={index}>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" className='slider-image-home' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <div className="text-hero">
                    <Container>
                        <div className="sub-title"><span className="tagline">Vamos a explorar</span></div>
                        <div className='text-title-hero'>
                            ¿A dónde te gustaría ir?
                        </div >
                        <div className="title-desc">Consulte lugares hermosos alrededor del Perú.</div>
                    </Container>
                </div>
            </div>
        </>
    )
}
export default HeroSection

