import PropTypes from 'prop-types';
import { FaBaby, FaLanguage, FaMapPin } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";

function TourInformationItem({ icon, title, description }) {
    return (
        <div className="card-information-tour">
            <span className="icono-information-tour">{icon}</span>
            <div className="items-information d-grid">
                <h5 className="item-tittle-information">{title}</h5>
                <h6 className="item-description-information">{description}</h6>
            </div>
        </div>
    );
}

TourInformationItem.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
};
function TourInformation({ tourData }) {
    return (
        <>
            {tourData.tamaño_grupo && (
                <TourInformationItem icon={<HiUserGroup />} title="Max. Personas" description={tourData.tamaño_grupo.toString()} />
            )}
            <TourInformationItem icon={<FaBaby />} title="Edad Minima" description="6 Años" />
            {tourData.Lugar_de_Recojo && (
                <TourInformationItem icon={<FaMapPin />} title="Lugar de Recojo" description={tourData.Lugar_de_Recojo} />
            )}
            {tourData.ubicaciones && (
                <TourInformationItem
                    icon={<FaMapLocationDot />}
                    title="Ubicaciones del Tour"
                    description={
                        tourData.ubicaciones.map((ubicacion) => ubicacion.nombre).join(", ")
                    }
                />

            )}
            {tourData.Idiomas_Disponibles && tourData.Idiomas_Disponibles.length > 0 && (
                <TourInformationItem
                    icon={<FaLanguage />}
                    title="Idiomas disponibles"
                    description={tourData.Idiomas_Disponibles.join(', ')} // Convierte el arreglo a string
                />
            )}
        </>
    );
}


TourInformation.propTypes = {
    tourData: PropTypes.object.isRequired,
};

export default TourInformation;
