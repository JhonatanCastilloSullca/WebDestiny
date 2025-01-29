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
    const GeneralData = general.nosotros;


    return (
        <div className="ftco-section ftco-about ftco-no-pt img mb-2">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-md-12 about-intro">
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-stretch">
                                <div className="img d-flex w-100 align-items-center justify-content-center" style={{ backgroundImage: "url('../../../src/assets/images/about-1.jpg')" }}>
                                </div>
                            </div>
                            <div className="col-md-6 pl-md-5 py-5">
                                <div className="row justify-content-start pb-3">
                                    <div className="col-md-12 heading-section">
                                        <span className="subheading">{t("nosotros.sobre-nosotros")}</span>
                                        <div className="incluye-tours" dangerouslySetInnerHTML={{ __html: GeneralData.descripcion }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
