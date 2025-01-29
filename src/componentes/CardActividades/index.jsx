import './index.css'
import serviciosData from '../../data/servicios.json'
import { FaBus, FaPersonHiking } from 'react-icons/fa6'
import { FaPlaneDeparture } from 'react-icons/fa'
import { RiVipLine } from "react-icons/ri";
import { useFetch } from '../../Hook/useFetch';

function CardActividades() {


    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
        })
    };
    const { data, loading, error } = useFetch("https://api.vertigotravelperu.com/api/servicios", requestOptions);
    const servicios = data;



    const hasServicios = servicios?.length > 0


    return (
        <>
            {hasServicios ? (
                servicios.map(servicio => (
                    <div key={servicio.id} className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                        <div className={`services color-${servicio.id} services-1 d-block img`} style={{ backgroundImage: `url(${servicio.Poster})` }}>
                            <div className="icon d-flex align-items-center justify-content-center">
                                {servicio.id == 1 && <FaPersonHiking className="h1 text-white" />}
                                {servicio.id == 2 && <FaPlaneDeparture className="h1 text-white" />}
                                {servicio.id == 3 && <RiVipLine className="h1 text-white" />}
                                {servicio.id == 4 && <FaBus className="h1 text-white" />}
                            </div>
                            <div className="media-body">
                                <h3 className="heading mb-3">{servicio.Title}</h3>
                                <p>{servicio.Content}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>*No se encontraron resultados</p>
            )}
        </>
    )
}
export default CardActividades
