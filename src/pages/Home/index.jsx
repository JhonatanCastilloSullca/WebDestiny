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
function Home() {

    return (
        <>
            <HeroSection />
            <Search />
            <Destinos />
            <Servicios />
            <Tours />
            <Parallax />
            <About />
            <Testimonios />
            {/* <Blog /> */}
            <Certificados />
        </>
    )
}

export default Home
