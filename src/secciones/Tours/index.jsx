import { DotLoader } from 'react-spinners';
import { useFetch } from '../../Hook/useFetch';
import CardTours from '../../componentes/CardTours'
import './index.css'
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function getRandomTours(tours, count) {
    let shuffled = tours.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
function Tours() {
    const { t } = useTranslation();
    const languageId = localStorage.lng === 'es' ? 1 : localStorage.lng === 'en' ? 2 : 1;

    const requestOptions = {
        method: 'POST',
        body: {
            language_id: languageId,
        }
    };
    const { data, loading, error } = useFetch("https://api.machupicchudestinytravel.com/api/tours", requestOptions);
    const ToursData = data;
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
    if (!ToursData) return <div>{t("buttons.no-se-encontraron")}</div>;
    return (
        <>
            <div className="ftco-section pt-0">
                <div className="container">
                    <div className="row justify-content-center pb-4">
                        <div className="col-md-12 heading-section text-center d-flex flex-column align-items-center ">
                            <span className="subheading mt-4">{t("tours.destinos")}</span>
                            <h2 className="line-09">{t("tours.nuestros-tours")}</h2>
                            <div className='d-flex gap-2 w-50 justify-content-center align-items-center'>
                                <div className="lineadiseño">

                                </div>
                                <div className="">
                                    <img src="src\assets\images\loc.png" alt="" className='imgdiseño' />
                                </div>
                                <div className="lineadiseño">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <CardTours tours={getRandomTours(ToursData, 3)} md={4} />
                        <Col className='pt-4'>
                            <p className='align-items-center justify-content-center d-flex'>
                                <NavLink to={`/tours`} className='btn btn-primary py-3 px-4'>
                                    {t("tours.revisa-nuestros-tours")}
                                </NavLink>
                            </p>
                        </Col>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Tours
