import { useContext } from 'react';
import './index.css'
import { GeneralContext } from '../../context/general';
import { useTranslation } from 'react-i18next';
import { MdDiscount, MdOutlineSecurity } from 'react-icons/md'
import { BiSolidUserVoice } from 'react-icons/bi'
import { GiFlyingFlag } from 'react-icons/gi'
import { Card, Col, Row } from 'react-bootstrap'
import { FaMedal } from 'react-icons/fa6'


function Servicios() {
    const { general } = useContext(GeneralContext);
    const GeneralData = general.nosotros;
    const { t } = useTranslation("translation");
    return (
        <>
            <div className="ftco-section services-section">
                <div className="container p-3">
                    <div className="row d-flex">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="img d-flex w-100 align-items-center justify-content-center imgservicios" style={{ backgroundImage: "url('../../../assets/images/Vertigo-nosotros.webp')" }}>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-last heading-section pl-md-5 d-flex align-items-center">
                            <div className="w-100">
                                <h6 className="small-section-title text-start text-primary text-uppercase">Sobre Nosotros</h6>
                                <span className="subheading text-gray">{GeneralData.titulo}</span>
                                <div className="incluye-tours" dangerouslySetInnerHTML={{ __html: GeneralData.subtitulo }}></div>
                                {/* <a href="#" className="btn btn-primary py-3 px-4 mt-4">{t("buttons.revisa-nuestros-tours")}</a> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container p-3 mt-4 pt-4">
                    <Row className="">
                        <Col md={3} className="d-flex justify-content-center ">
                            <Card className="border-0 p-0 m-0 d-flex align-items-center">
                                <div className="icon-container"><MdOutlineSecurity className='text-primary justify-content-center' /></div>
                                <Card.Body className="border-0 p-0 m-0  d-flex align-items-center ">
                                    <div className="content-description-services">
                                        <Card.Title className="mb-1 fs-3 text-center">Seguridad</Card.Title>
                                        <Card.Text className="mb-0 text-start pt-2 ">Nos preocupamos por la seguridad de nuestros clientes, por lo que contamos con vehículos y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center ">
                            <Card className="border-0 p-0 m-0 d-flex align-items-center">
                                <div className="icon-container"><BiSolidUserVoice className='text-primary' /></div>
                                <Card.Body className="border-0 p-0 m-0  d-flex align-items-center ">
                                    <div className="content-description-services">
                                        <Card.Title className="mb-1 fs-3 text-center">Atención al cliente</Card.Title>
                                        <Card.Text className="mb-0 text-start pt-2 ">Nos preocupamos por la seguridad de nuestros clientes, por lo que contamos con vehículos y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center ">
                            <Card className="border-0 p-0 m-0 d-flex align-items-center">
                                <div className="icon-container"><GiFlyingFlag className='text-primary' /></div>
                                <Card.Body className="border-0 p-0 m-0  d-flex align-items-center ">
                                    <div className="content-description-services">
                                        <Card.Title className="mb-1 fs-3 text-center">Guías expertos</Card.Title>
                                        <Card.Text className="mb-0 text-start pt-2 ">Nos preocupamos por la seguridad de nuestros clientes, por lo que contamos con vehículos y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center ">
                            <Card className="border-0 p-0 m-0 d-flex align-items-center">
                                <div className="icon-container"><MdDiscount className='text-primary' /></div>
                                <Card.Body className="border-0 p-0 m-0  d-flex align-items-center ">
                                    <div className="content-description-services">
                                        <Card.Title className="mb-1 fs-3 text-center">Calidad-precio</Card.Title>
                                        <Card.Text className="mb-0 text-start pt-2 ">Nos preocupamos por la seguridad de nuestros clientes, por lo que contamos con vehículos y equipos en excelentes condiciones, y cumplimos con todas las medidas de seguridad necesarias.</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Servicios
