import './index.css'
import { Col, Row } from 'react-bootstrap';
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { MdTour } from "react-icons/md";
import { IoTimerSharp } from "react-icons/io5";

function ToursInfoSection({ titulo, duracion, precio, categoria }) {
    return (
        <Row className="info-row p-2">
            <Col md={7} className=" d-flex align-items-center justify-content-center">
                <h2 className="subheading-tours m-0 font-weight-bold text-light">{titulo}</h2>
            </Col>
            <Col md={5} className='px-4'>
                <Row>
                    <Col>
                        <InfoItem icono={<IoTimerSharp />} titulo="Duración" contenido={duracion + " Dia(s)"} />
                    </Col>
                    <Col>
                        <InfoItem icono={<FaCircleDollarToSlot />} titulo="Precio" contenido={"S/. " + precio} />
                    </Col>
                    <Col>
                        <InfoItem icono={<MdTour />} titulo="Categoría" contenido={categoria} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

function InfoItem({ icono, titulo, contenido }) {
    return (
        <div className="icono-tour-cusco p-2">
            <div className="icono-diarios">
                <span className="icono-check-white h2">{icono}</span>
            </div>
            <div className="icono-diarios-text">
                <p className="m-0 text-primary text-tour-page-descriptions"><b>{titulo}</b></p>
                <span>{contenido}</span>
            </div>
        </div>
    );
}

export default ToursInfoSection;
