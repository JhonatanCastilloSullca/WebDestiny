import './index.css'
import Servicios from "../../secciones/Servicios"
import Destinos from "../../secciones/Destinos"
import Tours from "../../secciones/Tours"
import Parallax from "../../secciones/Parallax"
import About from "../../secciones/About"
import Testimonios from "../../secciones/Testimonios"
import Search from '../../secciones/Search'
import HeroSection from '../../secciones/HeroSection'
import Certificados from '../../secciones/Certificados'

import { useContext, useEffect } from 'react'
import { GeneralContext } from '../../context/general'
import { useCart } from '../../Hook/useCart'
import { useTranslation } from 'react-i18next'

function Home() {

    const { t } = useTranslation();


    const { clearCart } = useCart();
    useEffect(() => {
        clearCart();
    }, []);
    const { general } = useContext(GeneralContext);
    const GeneralData = general.nosotros;
    return (
        <>
            <HeroSection />
            <Search />
            <Servicios />

            <Destinos />
            <Tours />
            {/* <Parallax /> */}
            {/* <About /> */}
            <Testimonios />
            {/* <Blog /> */}
            <Certificados />
        </>
    )
}

export default Home
