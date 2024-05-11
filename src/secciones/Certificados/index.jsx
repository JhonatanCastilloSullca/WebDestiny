
import './index.css'
import { GeneralContext } from '../../context/general';
import { useContext } from 'react';
import TituloSection from '../../componentes/TituloSection';
import CertificadoCarousel from '../../componentes/CertificadoCarousel';

function Certificados() {


    const { general: GeneralData } = useContext(GeneralContext);
    const cabeceraTipo = GeneralData.certificados[0];
    return (
        <>
            <div className="ftco-section">
                <div className="container">
                    <TituloSection titulo={cabeceraTipo.titulo} subtitulo={cabeceraTipo.subtitulo} />
                    <CertificadoCarousel general={cabeceraTipo} />
                </div>
            </div>
        </>
    )
}
export default Certificados

