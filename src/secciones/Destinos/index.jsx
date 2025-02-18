import './index.css'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useFetch } from '../../Hook/useFetch';
import { NavLink } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
function Destinos() {
    const [currentUbicacion, setCurrentUbicacion] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('http://192.168.1.24/storage/img/ubicaciones/es-manu.jpg');
    const [titulo, setTitulo] = useState('Manu');
    const [descripcion, setDescripcion] = useState('Manu, conocido por su rica biodiversidad, en especial por sus cientos de especies');
    const [slug, setSlug] = useState('manu');
    useEffect(() => {
        if (currentUbicacion && currentUbicacion.image && currentUbicacion.image.nombre) {
            setBackgroundImage(currentUbicacion.image.nombre);
            setTitulo(currentUbicacion.nombre);
            setDescripcion(currentUbicacion.descripcion);
            setSlug(currentUbicacion.slug);
        }
    }, [currentUbicacion]);

    const { t } = useTranslation();
    const languageId = localStorage.lng === 'es' ? 1 : localStorage.lng === 'en' ? 2 : null;
    const requestOptions = {
        method: 'POST',
        body: {
            language_id: languageId
        }
    };
    const { data, loading, error } = useFetch("https://api.vertigotravelperu.com/api/ubicaciones", requestOptions);
    const GeneralData = data;
    if (loading) return <div className="mainloader">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <DotLoader color="#00b5c4" loading={true} size={100} />
        </div>
    </div>;
    if (error) return <div className="mainloader">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <DotLoader color="#ff0011" loading={true} size={100} />
        </div>
    </div>;



    if (!GeneralData) return <div>{t("buttons.no-se-encontraron")}</div>;
    return (
        <>
            <div className="ftco-section img ftco-select-destination destination-banner  " style={{ backgroundImage: `url(https://images5.alphacoders.com/361/thumb-1920-361088.jpg)` }}>
                <div className="container">
                    <div className="row justify-content-center pb-4 container-text-destinos">
                        <div className="col-md-12 heading-section text-center ">
                            <span className="subheading">{t("destinos.nuestros-paquetes")}</span>
                            <h2 className="mb-4 text-light">{t("destinos.selecciona-tu-destino-favorito")}</h2>
                        </div>
                    </div>
                </div>
                <div className="container container-destinos-padding-top" >
                    <div className="row justify-content-center pb-4">
                        <div className="row justify-content-between">
                            <Col md={9}>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={true}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="mySwiper"
                                >
                                    {
                                        GeneralData.map((ubicacion) => (
                                            <SwiperSlide key={ubicacion.id}>
                                                <NavLink to={`/paquete/${ubicacion.slug}`}>
                                                    <div className="item" style={{ backgroundImage: `url(${ubicacion.image ? ubicacion.image.nombre : ''})` }}>
                                                        <div className="content">
                                                            <h2 className="title">{ubicacion.nombre}</h2>
                                                            <p className="copy">{ubicacion.descripcion}</p>
                                                        </div>
                                                        <div className="project-destination">
                                                            <div className="text">
                                                                <span>{ubicacion.tours_count} Tours</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </Col>
                            <Col md={3}>
                                <div>
                                    <h4 className='fw-bolder fs-60 lh-1 text-light'>Destinos perfectos</h4>
                                    <span className='fw-normal fs-5 lh-1 text-light'>{"Encuentra el destino perfecto para tu proxima aventura en Perú"}</span>
                                </div>
                            </Col>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Destinos
