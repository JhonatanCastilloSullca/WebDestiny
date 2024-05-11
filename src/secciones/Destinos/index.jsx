import './index.css'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useFetch } from '../../Hook/useFetch';
import { NavLink } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
function Destinos() {
    const { t } = useTranslation();
    const requestOptions = {
        method: 'POST',
        body: {
            language_id: 1
        }
    };
    const { data, loading, error } = useFetch("http://192.168.1.22/api/ubicaciones", requestOptions);
    const GeneralData = data;
    if (loading) return <div className="mainloader">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <DotLoader color="#f79633" loading={true} size={100} />
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
            <div className="ftco-section img ftco-select-destination">
                <div className="container">
                    <div className="row justify-content-center pb-4">
                        <div className="col-md-12 heading-section text-center">
                            <span className="subheading">{t("destinos.nuestros-paquetes")}</span>
                            <h2 className="mb-4">{t("destinos.selecciona-tu-destino-favorito")}</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center pb-4">
                        <div className="row">
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={50}
                                centeredSlides={true}
                                grabCursor={true}
                                autoplay={{
                                    delay: 1800,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 40,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 50,
                                    },
                                }}
                                className="mySwiperDestiny"
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Destinos
