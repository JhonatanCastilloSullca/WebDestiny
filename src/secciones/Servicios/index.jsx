import { useContext } from 'react';
import './index.css'
import { GeneralContext } from '../../context/general';
import { useTranslation } from 'react-i18next';


function Servicios() {
    const { general } = useContext(GeneralContext);
    const GeneralData = general.nosotros[0];
    const { t } = useTranslation("translation");
    return (
        <>
            <div className="ftco-section services-section">
                <div className="container p-3">
                    <div className="row d-flex">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="img d-flex w-100 align-items-center justify-content-center imgservicios" style={{ backgroundImage: "url('../../../src/assets/images/Vertigo-nosotros.webp')" }}>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-last heading-section pl-md-5 d-flex align-items-center">
                            <div className="w-100">
                                <h6 className="small-section-title text-start text-primary text-uppercase">Sobre Nosotros</h6>
                                <span className="subheading text-gray">{GeneralData.titulo}</span>
                                <div className="incluye-tours" dangerouslySetInnerHTML={{ __html: GeneralData.subtitulo }}></div>
                                <a href="#" className="btn btn-primary py-3 px-4 mt-4">{t("buttons.revisa-nuestros-tours")}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Servicios
