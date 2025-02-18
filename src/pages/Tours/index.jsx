import { Accordion, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap"
import './index.css'
import CardTours from "../../componentes/CardTours"
import { useParams } from "react-router-dom"
import ToursInfoSection from "../../componentes/ToursInfoSection";
import CardFormulario from "../../componentes/CardFormulario";
import TourInformation from "../../componentes/ToursInfoItems";
import { useFetch } from "../../Hook/useFetch";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { DotLoader } from "react-spinners";
import { BsCalendar, BsCheckCircle, BsEnvelope, BsInfoCircle } from "react-icons/bs";
import FormularioContacto from "../../secciones/FormularioContacto";
import { useState } from "react";


function ToursPage() {

    const params = useParams();
    const tourId = params.id;

    const requestOptions = {
        method: 'POST',
    };
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };


    const { data: tourData, loading, error } = useFetch(`https://api.machupicchudestinytravel.com/api/tour-slug?slug=${tourId}`, requestOptions);

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
    if (!tourData) return <div>No se encontró el tour</div>;
    const detallesTourDias = tourData.itinerarios;


    if (!tourData) {
        return <div>El tour no existe.</div>;
    }

    return (
        <>
            <div className="hero-wrap js-mediumheight-tour altura-tours" >
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    centeredSlides={false}
                    grabCursor={true}
                    loop={true}
                    navigation={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                    className="mySwiperDestiny"
                >
                    {tourData.images.map(tour => (
                        <SwiperSlide key={tour.id}>
                            <img data-lazyloaded="1" src={tour.nombre} width="100%" height="450px" className="img-galery-tour"></img>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
            <Container className="bg-primary mw-100">
                <ToursInfoSection
                    titulo={tourData.nombre}
                    duracion={tourData.duracion}
                    precio={tourData.precio}
                    categoria={tourData.categoria.nombre}
                />
            </Container>
            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container className="p-4">
                    <Row className="pb-4 mb-4">
                        <Col md={6}>
                            <CardFormulario tour={tourData} />
                        </Col>
                        {/* <Col md={6} className="video-iframe">
                            <iframe width="600" height="300" src="https://www.youtube.com/embed/8J6J-5E3JVA" title="Machupicchu en 10 Segundos - Victor Class" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        </Col> */}
                        <Col md={6} className="heading-section">
                            <div className="w-100">
                                {tourData.nombre && tourData.descripcion && (
                                    <Container className="mt-4">
                                        <h3 className="box-title m-0">{tourData.nombre}</h3>
                                        <div className="incluye-tours" dangerouslySetInnerHTML={{ __html: tourData.descripcion }}></div>
                                    </Container>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Tabs defaultActiveKey="itinerario" id="justify-tab-content" className="mb-3" justify>
                        <Tab className="" eventKey="itinerario" title={<span className="tabs-tour"><BsCalendar /> Itinerario</span>}>
                            {detallesTourDias && detallesTourDias.length > 0 && (
                                <Container className="mt-4">
                                    <h3 className="box-title m-0">Itinerario</h3>
                                    <Accordion defaultActiveKey="0" className="pt-4">
                                        {detallesTourDias.map((detalle, index) => (
                                            <Accordion.Item key={index} eventKey={String(index)}>
                                                <Accordion.Header>
                                                    <h6 className="fw-bold text-primary">Día {index + 1}: {detalle.titulo}</h6>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="incluye-tours" dangerouslySetInnerHTML={{ __html: detalle.descripcion }}></div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </Container>
                            )}
                        </Tab>
                        {/* <Tab className="" eventKey="informacion" title={<span className="tabs-tour"><BsInfoCircle /> Informacion</span>}>
                            <Row className="gap-4">
                                {tourData.tamaño_grupo || tourData.Lugar_de_Recojo || tourData.ubicaciones || (tourData.Idiomas_Disponibles && tourData.Idiomas_Disponibles.length > 0) ? (
                                    <Card className="border-0">
                                        <Card.Body>
                                            <h3 className="box-title">Información del Tour</h3>
                                            <TourInformation tourData={tourData} />
                                        </Card.Body>
                                    </Card>
                                ) : null}
                            </Row>
                        </Tab> */}
                        <Tab className="" eventKey="incluye" title={<span className="tabs-tour"><BsCheckCircle /> Incluye</span>}>
                            <Row className="gap-4 mt-4">
                                <Container className="">
                                    <h3 className="box-title m-0">Incluye</h3>
                                    <Accordion defaultActiveKey="0" className="pt-4">
                                        <Row>
                                            <Col>
                                                <Row className="">
                                                    <div className="incluye-tours" dangerouslySetInnerHTML={{ __html: tourData.incluye }}></div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Accordion>
                                </Container>
                            </Row>
                        </Tab>
                        <Tab className="" eventKey="no-incluye" title={<span className="tabs-tour"><BsCheckCircle /> No Incluye</span>}>
                            <Row className="gap-4 mt-4">
                                <Container className="">
                                    <h3 className="box-title m-0">No Incluye</h3>
                                    <Accordion defaultActiveKey="0" className="pt-4">
                                        <Row>
                                            <Col>
                                                <Row className="pt-4">
                                                    <div className="noincluye-tours" dangerouslySetInnerHTML={{ __html: tourData.noincluye }}></div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Accordion>
                                </Container>
                            </Row>
                        </Tab>
                        <Tab className="" eventKey="que-llevar" title={<span className="tabs-tour"><BsCheckCircle /> Que llevar</span>}>
                            <Row className="gap-4 mt-4">
                                <Container className="">
                                    <h3 className="box-title m-0">Que llevar</h3>
                                    <Accordion defaultActiveKey="0" className="pt-4">
                                        <Row>
                                            <Col>
                                                <Row className="pt-4">
                                                    <div className="description-tours recomendation-tours" dangerouslySetInnerHTML={{ __html: tourData.recomendaciones }}>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Accordion>
                                </Container>
                            </Row>

                        </Tab>
                        <Tab className="" eventKey="contact" title={<span className="tabs-tour"><BsEnvelope /> Contact</span>} >
                            <FormularioContacto handleSubmit={handleSubmit} />

                        </Tab>
                    </Tabs>
                </Container>
                <Container>
                    <h3 className="box-title m-0">Tours Relacionados</h3>
                    <Row className="pt-4">
                        <CardTours md={4} />
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ToursPage
