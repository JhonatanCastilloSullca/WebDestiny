import './index.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/general";
import CertificadoCarousel from "../../componentes/CertificadoCarousel";
import { useCart } from "../../Hook/useCart";
import { Col, Container, Row } from 'react-bootstrap';
import { FaMedal, FaUserGraduate } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';
import About from '../../secciones/About';
import Testimonios from '../../secciones/Testimonios';
import { useTranslation } from 'react-i18next';



function NosotrosPage() {
    const { t } = useTranslation();


    const { clearCart } = useCart();
    useEffect(() => {
        clearCart();
    }, []);
    const { general } = useContext(GeneralContext);
    const GeneralData = general.nosotros[0];
    console.log("🚀 ~ NosotrosPage ~ GeneralData:", GeneralData)

    const cabeceraTipo = general.certificados[0];

    return (
        <>
            <div className="hero-wrap js-mediumheight" style={{ backgroundImage: `url('${GeneralData.image_principal}')` }}>
                <div className="overlay-real"></div>
                <Container className="position-relative">
                    <Row className="js-mediumheight d-flex justify-content-center align-items-center">
                        <div className="principal-hero-title d-flex flex-column justify-content-center align-items-center">
                            <h1>{t("nosotros.nosotros")}</h1>
                            <p className="principal-hero-text">{GeneralData.titulo}</p>
                        </div>
                    </Row>
                </Container>
            </div>
            <About />
            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className="d-grid gap-4">
                                <div className="w-100 d-flex justify-content-between align-items-center gap-4 pt-2 px-4 border border-4 rounded-2">
                                    <FaMedal className="icono-nosotros text-dark" />
                                    <div className="text-nosotros px-2" dangerouslySetInnerHTML={{ __html: GeneralData.descripcion1 }}>
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-between align-items-center gap-4 pt-2 px-4 border border-4 rounded-2">
                                    <div className="text-nosotros px-2" dangerouslySetInnerHTML={{ __html: GeneralData.descripcion2 }}>

                                    </div>
                                    <FaUserGraduate className="icono-nosotros text-dark" />
                                </div>
                                <div className="w-100 d-flex justify-content-between align-items-center gap-4 pt-2 px-4 border border-4 rounded-2">
                                    <FaClockRotateLeft className="icono-nosotros text-dark" />
                                    <div className="text-nosotros px-2" dangerouslySetInnerHTML={{ __html: GeneralData.descripcion3 }}>

                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className='d-flex align-items-center'>
                            <div className="w-100">
                                <Swiper
                                    modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    grabCursor={true}
                                    loop={true}
                                    navigation={true}
                                    autoplay={{
                                        delay: 10000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 1,
                                            spaceBetween: 40,
                                        },
                                        1024: {
                                            slidesPerView: 1,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    className="mySwiperDestiny"
                                >
                                    {GeneralData.images.map(tour => (

                                        <SwiperSlide key={tour.id}>
                                            <img src={tour.nombre} alt="Contacto" className='w-100 border rounded' />
                                        </SwiperSlide>
                                    ))}

                                </Swiper>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Testimonios />
            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container className="text-center">
                    <Row className="mb-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className="section-description">
                                Somos una empresa cusqueña dinámica que genera experiencias turísticas de calidad en turismo cultural, de naturaleza, de aventura y comunitario. Con más de 10 años diseñando productos turísticos en el sur del Perú, ofrecemos una oferta diversificada y contribuimos a la preservación cultural y natural de nuestro país. Además capacitamos constantemente a nuestro personal y aliados estratégicos en nuestros diferentes destinos, lo que nos permite garantizar altos estándares de calidad.
                            </p>
                        </div>
                    </Row>
                    <Row>
                        <CertificadoCarousel general={cabeceraTipo} />
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default NosotrosPage
