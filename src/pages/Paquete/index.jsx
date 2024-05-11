import { Button, Container, Row } from "react-bootstrap"
import './index.css'
import CardTours from "../../componentes/CardTours"
import { useParams } from "react-router-dom"
import { useFetch } from "../../Hook/useFetch";
import { useContext } from "react";
import { GeneralContext } from "../../context/general";
import CertificadoCarousel from "../../componentes/CertificadoCarousel";
import { DotLoader } from "react-spinners";
import { useTranslation } from "react-i18next";


function PaquetePage() {
    const { t } = useTranslation();
    const { general: GeneralData } = useContext(GeneralContext);
    const cabeceraTipo = GeneralData.certificados[0];


    const params = useParams();
    const paqueteSlug = params.id;


    const requestOptions = {
        method: 'POST',

    };
    const { data: paqueteData, loading, error } = useFetch(`http://192.168.1.22/api/ubicacion-slug?language_id=1&slug=${paqueteSlug}`, requestOptions);



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
    if (!paqueteData) return <div>{t("error.no-se-encontro-tour")}</div>;
    if (!paqueteData) {
        return <div>{t("error.tour-no-existe")}</div>;
    }

    return (
        <>
            <div className="hero-wrap js-altoheight" style={{ backgroundImage: `url('${paqueteData.image.nombre}')` }}>
                <div className="overlay-real-paquete"></div>
                <Container className="position-relative">
                    <Row className="js-altoheight d-flex justify-content-center align-items-center">
                        <div className="principal-hero-title d-flex flex-column justify-content-center align-items-center">
                            <h1>EXPLORA Y CONOCE "{paqueteData.nombre}" CON Cusco Insight</h1>
                            <p className="principal-hero-text">{paqueteData.descripcion}</p>

                            <div className="hero-buttons-container">
                                <Button href="" className="button-hero">
                                    <span>Contacta con un asesor</span>
                                </Button>
                                <Button href="#Tours" className="button-hero">
                                    <span>Ver tours disponibles</span>
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>

            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container className="text-center">
                    <Row className="mb-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="section-title"> Los mejores tours en "{paqueteData.nombre}" con Cusco Insight</h1>
                            <p className="section-description">
                                Somos una empresa cusqueña dinámica que genera experiencias turísticas de calidad en turismo cultural, de naturaleza, de aventura y comunitario. Con más de 10 años diseñando productos turísticos en el sur del Perú, ofrecemos una oferta diversificada y contribuimos a la preservación cultural y natural de nuestro país. Además capacitamos constantemente a nuestro personal y aliados estratégicos en nuestros diferentes destinos, lo que nos permite garantizar altos estándares de calidad.
                            </p>
                        </div>
                    </Row>
                    <Row>
                        <CertificadoCarousel general={cabeceraTipo} />
                    </Row>
                </Container>
            </div >
            <div id="Tours"></div>
            <div className="ftco-section pt-0" >
                <Container className="">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1 className="section-title"> Nuestros tours en {paqueteData.nombre}</h1>
                        <p className="section-description">
                            Cada uno de nuestros recorridos está dirigido por guías certificados y experimentados que le acompañarán en el reconocido Trek a Machu Picchu a través de las rutas del Camino Salkantay y el Camino Inca. Ya sea que viaje con un pequeño grupo de entusiastas de la aventura o con un círculo cercano de familiares y amigos, nuestro equipo a tiempo completo está disponible las 24 horas, siempre dispuesto a proporcionarle todo lo necesario para una experiencia inolvidable.</p>
                    </div>
                    <Row className="mt-4">
                        {paqueteData?.tours && <CardTours tours={paqueteData.tours} md={4} />}
                    </Row>
                </Container>
            </div>

        </>
    )
}

export default PaquetePage
