import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../context/general";
import CertificadoCarousel from "../../componentes/CertificadoCarousel";
import { useCart } from "../../Hook/useCart";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdMarkEmailRead } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import FormularioContacto from '../../secciones/FormularioContacto';



function ContactPage() {
    const { t } = useTranslation();


    const { clearCart } = useCart();
    useEffect(() => {
        clearCart();
    }, []);
    const { general } = useContext(GeneralContext);
    const GeneralData = general.nosotros;
    const cabeceraTipo = general.certificados;
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>

            <div className="hero-wrap js-mediumheight" style={{ backgroundImage: `url('${GeneralData.image_principal}')` }}>
                <div className="overlay-real"></div>
                <Container className="position-relative">
                    <Row className="js-mediumheight d-flex justify-content-center align-items-center">
                        <div className="principal-hero-title d-flex flex-column justify-content-center align-items-center">
                            <h1>{t("contacto.contactanos")}</h1>
                            <p className="principal-hero-text">{GeneralData.titulo}</p>
                        </div>
                    </Row>
                </Container>
            </div>
            <FormularioContacto handleSubmit={handleSubmit} />
            <div className="ftco-section services-section pt-0 descriptio-tour-container">
                <Container>
                    <Row>

                        <Row>
                            <div className="my-4 ">
                                <h6 className="section-title text-primary text-uppercase text-center">¡Contáctanos!</h6>
                                <h6 className="section-subtitle text-gray text-uppercase text-center">¡Estamos aquí para ayudarte! Ponte en contacto con nosotros para cualquier consulta o asistencia.</h6>
                            </div>
                        </Row>
                        <Col md={5} className='d-flex align-items-center'>
                            <img src="https://media.istockphoto.com/id/903568822/photo/call-center-workers.jpg?s=612x612&w=0&k=20&c=wGoPEMHmgnB7zwGl0pUaWP1nl_S3dOhnFxTNkQQhtiI=" alt="Contacto" className='w-100 border rounded' />
                        </Col>
                        <Col md={7} className=''>
                            <Row className="">
                                <Col md={4} className="d-flex justify-content-center ">
                                    <div className="align-self-stretch box p-4 text-center border-primary border rounded">
                                        <div className="icon-contact d-flex align-items-center justify-content-center">
                                            <FaLocationDot className='icon-fa' />
                                        </div>
                                        <h3 className="mb-2 text-max-min">{t("contacto.ubicacion-nuestro-local")}</h3>
                                        <p>C. Plateros 394, Cusco, Perú</p>
                                    </div>
                                </Col>
                                <Col md={4} className="d-flex justify-content-center ">
                                    <div className="align-self-stretch box p-4 text-center border-primary border rounded">
                                        <div className="icon-contact d-flex align-items-center justify-content-center">
                                            <FaPhone className='icon-fa' />
                                        </div>
                                        <h3 className="mb-2 text-max-min">{t("contacto.numero-contacto")}</h3>
                                        <p>+51 990 757 584</p>
                                    </div>
                                </Col>
                                <Col md={4} className="d-flex justify-content-center ">
                                    <div className="align-self-stretch box p-4 text-center border-primary border rounded">
                                        <div className="icon-contact d-flex align-items-center justify-content-center">
                                            <MdMarkEmailRead className='icon-fa' />
                                        </div>
                                        <h3 className="mb-2 text-max-min">{t("contacto.direaccion-email")}</h3>
                                        <p>info@destinytravel.com</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div >



            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container>
                    <div className="my-4 ">
                        <h6 className="section-title text-primary text-uppercase text-center">¡Ven a Conocernos!</h6>
                        <h6 className="section-subtitle text-gray text-uppercase text-center">¡Un asesor de Destiny Travel estará encantado de atenderte en persona!</h6>
                    </div>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1120.4652320228565!2d-71.97783319011614!3d-13.522425920970186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd7c87b47b2c7%3A0x7ce131a5d62ea7aa!2sGlobal%20Impresores%20Cusco!5e0!3m2!1ses-419!2spe!4v1715382965914!5m2!1ses-419!2spe" width="100%" height="450" style={{ border: 0 }} loading="lazy"></iframe>
                </Container>
            </div >

            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container className="text-center">
                    <Row className="mb-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className="section-description">
                                {t("testimonios.mensaje-testimonio")}
                            </p>
                        </div>
                    </Row>
                    <Row>
                        <CertificadoCarousel general={cabeceraTipo} />
                    </Row>
                </Container>
            </div >
        </>
    )
}

export default ContactPage
