import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './index.css';
import { GeneralContext } from '../../context/general';
import { useTranslation } from 'react-i18next';
import { MdDiscount, MdOutlineSecurity } from 'react-icons/md';
import { BiSolidUserVoice } from 'react-icons/bi';
import { GiFlyingFlag } from 'react-icons/gi';

function About() {
    const { t } = useTranslation();

    const { general } = useContext(GeneralContext);
    const GeneralData = general.nosotros[0];


    return (
        <div className="ftco-section ftco-about ftco-no-pt img mb-2 h-100">
            <Container>
                <Row className="d-flex">
                    <Col md={12} className="about-intro">
                        <Row>
                            <Col md={6} className="d-flex align-items-stretch">
                                <div className="img d-flex w-100 align-items-center justify-content-center img-nosotros" style={{ backgroundImage: "url('../../../src/assets/images/about-1.jpg')" }}></div>
                            </Col>
                            <Col md={6} className="d-flex flex-column align-items-stretch pt-4">
                                <h6 className="section-title text-primary text-uppercase">Nos presentamos</h6>
                                <div className="info-nosotros-terms">
                                    <Row>
                                        <Col md={12}>
                                            <Row className="tbl-razon-social">
                                                <Col md={6}>Razón Social:</Col>
                                                <Col md={6}>PERU GREEN LUXURY E.I.R.L.</Col>
                                            </Row>
                                            <Row className="tbl-razon-social">
                                                <Col md={6}>Número de RUC:</Col>
                                                <Col md={6}>20564149242</Col>
                                            </Row>
                                            <Row className="tbl-razon-social">
                                                <Col md={6}>Actividad Económica:</Col>
                                                <Col md={6}>Agencia de viajes</Col>
                                            </Row>
                                            <Row className="tbl-razon-social">
                                                <Col md={6}>Licencia de Funcionamiento:</Col>
                                                <Col md={6}>037-2019</Col>
                                            </Row>
                                            <Row className="tbl-razon-social">
                                                <Col md={6}>Certificado de Autorización:</Col>
                                                <Col md={6}>025-2019</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={12} className="pt-4 text-center">
                                <h6 className="section-title text-primary text-uppercase">Sobre nosotros</h6>
                                <h1 className="mb-4">Por que elegir <span className="text-primary text-uppercase">Cusco Insight? </span></h1>
                                <Row className="pb-4 justify-content-center">
                                    <Col sm={8}>
                                        <Card className="border-0">
                                            <Card.Body className="border-0 py-2 d-flex align-items-center pt-2">
                                                <div className="icon-container"><MdOutlineSecurity className='text-primary' /></div>
                                                <div className="content-description-services">
                                                    <Card.Title className="mb-1 fs-3">Seguridad</Card.Title>
                                                    <Card.Text className="mb-0 text-start px-4">Nos preocupamos por la seguridad de nuestros clientes, por lo que contamos con vehículos y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0">
                                            <Card.Body className="border-0 py-2 d-flex align-items-center pt-2">
                                                <div className="icon-container"><BiSolidUserVoice className='text-primary' /></div>
                                                <div className="content-description-services">
                                                    <Card.Title className="mb-1 fs-3">Atención al cliente</Card.Title>
                                                    <Card.Text className="mb-0 text-start px-4">Nos preocupamos por la seguridad de nuestros clientes, por lo que contamos con vehículos y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0">
                                            <Card.Body className="border-0 py-2 d-flex align-items-center pt-2">
                                                <div className="icon-container"><GiFlyingFlag className='text-primary' /></div>
                                                <div className="content-description-services">
                                                    <Card.Title className="mb-1 fs-3">Guías expertos</Card.Title>
                                                    <Card.Text className="mb-0 text-start px-4">Nos preocupamos por la s y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0">
                                            <Card.Body className="border-0 py-2 d-flex align-items-center pt-2">
                                                <div className="icon-container"><MdDiscount className='text-primary' /></div>
                                                <div className="content-description-services">
                                                    <Card.Title className="mb-1 fs-3">Calidad-precio</Card.Title>
                                                    <Card.Text className="mb-0 text-start px-4">Nos preocupamos por la seguridad de nuestros clientes, por lo que contamos con vehículos y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;
