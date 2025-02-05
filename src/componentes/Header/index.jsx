import { useContext, useState } from 'react'
import './index.css'
import { Link, NavLink } from 'react-router-dom';
import Cart from '../Cart';
import { Button, Card, Col, Container, Dropdown, DropdownButton, Image, Nav, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../Hook/useFetch';
import { GeneralContext } from '../../context/general';
import { DotLoader } from 'react-spinners';
import { FaCalendar, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedin, FaRegEnvelope, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
function Header() {
    const { general } = useContext(GeneralContext);
    const GeneralData = general.menus;

    const [imgpreview, setImgPreview] = useState('https://vertigotravelperu.com/wp-content/uploads/2022/09/manu1.png');
    const handleSlugTour = (imagen) => {
        setImgPreview(imagen)
    }

    const { t, i18n } = useTranslation("translation");

    const handleChangeLng = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('lng', lng);
        const newrute = window.location.origin + window.location.pathname
        if (window.location.pathname.substring(0, 6) === "/tours") {
            console.log("La URL comienza con /tours/");
            console.log("La ruta completa es: " + window.location.pathname);
            window.location.href = window.location.origin;
        }
        else {
            window.location.href = window.location.origin;
        }
    };


    const [navbar, setNavbar] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const handleMouseEnter = (menuId) => {
        setActiveMenu(menuId);
    };
    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    const renderMenu = (menu) => {
        if (activeMenu === menu.id) {
            return (
                <Container className='container-menu'>
                    <div className="drpwdpwm-menu">
                        <Row >
                            <Container className=' d-flex justify-content-center align-items-start'>
                                <Col md={8}  >
                                    <Row className=' d-flex justify-content-center align-items-start'>
                                        {menu.detalles && menu.detalles.length > 0 ? (
                                            menu.detalles.map((categoria) => (
                                                <Col key={categoria.id} className='p-0'>
                                                    <span className='nav-link tittle-categoria-header w-100'>
                                                        {categoria.categoria.nombre}
                                                    </span>
                                                    <Row>
                                                        <Col className='d-grid gap-2 height-menu '>
                                                            {categoria.categoria.tours.map((tour) => (
                                                                <NavLink
                                                                    to={`/tours/${tour.slug}`}
                                                                    onMouseOver={() => handleSlugTour(tour.imagenprincipal)}
                                                                    className='w-100 border-bot-menu p-0'
                                                                    key={tour.id}
                                                                >
                                                                    <div className="menu-title-nav pt-2">{tour.nombre}</div>
                                                                </NavLink>
                                                            ))}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            ))
                                        ) : (
                                            <li>No hay categorías disponibles</li>
                                        )}
                                    </Row>
                                </Col>
                                <Col md={4} className='d-flex justify-content-center align-items-center'>
                                    <div className='d-flex justify-content-center rounded'>
                                        <img
                                            src={imgpreview}
                                            alt="imagen"
                                            className='img-fluid p-4 img-menu '
                                        />
                                    </div>
                                </Col>
                            </Container>
                        </Row >
                    </div >
                </Container >
            );
        }
        return null;
    };



    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
        })
    };
    const { data, loading, error } = useFetch("https://api.vertigotravelperu.com/api/categorias", requestOptions);
    const categorias = data;
    window.addEventListener('scroll', changeBackground);
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
    if (!categorias) return <div>No se encontraron tours</div>;

    return (
        <>
            {
                navbar ? (
                    <Row className='w-100 m-0 fixed-navbar navbar'>
                        <Col md={12} className='bg-primary d-flex justify-content-center align-items-center p-0'>
                            <Nav className="d-flex align-items-center text-white">
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link'
                                    }}>
                                        {t("header.home")}
                                    </NavLink>
                                </li>
                                {GeneralData.filter(menu => menu.tipo === '1').map((menu) => (
                                    <li
                                        className="nav-item d-flex align-items-center text-white"
                                        key={menu.id}
                                    >
                                        <div
                                            className="nav-item"
                                            onMouseEnter={() => handleMouseEnter(menu.id)}
                                            onMouseLeave={() => handleMouseLeave(menu.id)}
                                        >
                                            <NavLink
                                                className={({ isActive }) => {
                                                    return isActive ? 'nav-link ' : ' nav-link active '
                                                }}
                                            >
                                                {menu.nombre ? menu.nombre : 'Nombre no disponible'}
                                            </NavLink>
                                            {renderMenu(menu)}
                                        </div>
                                    </li>
                                ))}
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/tours' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link '
                                    }}>
                                        Tours
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/nosotros' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link '
                                    }}>
                                        {t("header.about")}
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/contacto' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link '
                                    }}>
                                        Contacto
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <DropdownButton
                                        id="language-selector"
                                        variant="transparent"
                                        className="nav-link p-0 bg-transparent"
                                        title={<><span className="ml-2">{i18n.language === 'es' ? <img src="../../assets/images/iconos/pe.svg" className='flags text-white' alt="Perú" /> : <img src="../../assets/images/iconos/us.svg" className='flags' alt="Estados Unidos" />}</span></>}
                                    >
                                        <Dropdown.Item onClick={() => handleChangeLng('es')}>
                                            <img src="../../assets/images/iconos/pe.svg" className='flags' alt="Perú" />Español
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChangeLng('en')}>
                                            <img src="../../assets/images/iconos/us.svg" className='flags' alt="Estados Unidos" />English
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <Cart></Cart>
                                </li>
                            </Nav>
                        </Col>
                    </Row>
                ) : (
                    <Row className='w-100 m-0 fixed-navbar navbar' >
                        <Col md={12} className='bg-white d-flex justify-content-center align-items-center p-2'>
                            <Container className='d-flex justify-content-between'>
                                <Image src="../assets/images/destiny-logo-horizontal-2.webp" height={'70px'} rounded />
                                <Container className='container-contets'>
                                    <Row className='justify-content-end d-grid'>
                                        <Nav className="col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                                            <Nav.Item>
                                                <NavLink href="#" className="px-2 py-0 text-gray"><FaRegEnvelope className='text-primary' /> destinytravel@gmail.com</NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink href="#" className="px-2 py-0 text-gray">Blog</NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink href="#" className="px-2 py-0 text-gray" target="_blank">Sobre Nosotros</NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink href="#" className="px-2 py-0 text-gray">Contactenos</NavLink>
                                            </Nav.Item>
                                        </Nav>
                                        <Nav className="col-12 col-md-auto justify-content-center pt-2 gap-2 align-items-center">
                                            <Nav.Item>
                                                <NavLink className="px-2 text-gray">
                                                    <FaCalendar className='text-primary' /> Lun-Sab 9am - 7pm PE
                                                </NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink href="#" className="px-2 text-gray">
                                                    <FaPhoneAlt className='text-primary' /> +51 922 572 478
                                                </NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Button variant="primary">Reserve Ahora</Button>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Button variant="primary">Camino Inca</Button>
                                            </Nav.Item>
                                        </Nav>
                                    </Row>
                                </Container>
                            </Container>
                        </Col>
                        <Col md={12} className='bg-primary d-flex justify-content-center align-items-center p-0'>
                            <Nav className="d-flex align-items-center text-white">
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link'
                                    }}>
                                        {t("header.home")}
                                    </NavLink>
                                </li>
                                {GeneralData.filter(menu => menu.tipo === '1').map((menu) => (
                                    <li
                                        className="nav-item d-flex align-items-center text-white"
                                        key={menu.id}
                                    >
                                        <div
                                            className="nav-item"
                                            onMouseEnter={() => handleMouseEnter(menu.id)}
                                            onMouseLeave={() => handleMouseLeave(menu.id)}
                                        >
                                            <NavLink
                                                className={({ isActive }) => {
                                                    return isActive ? 'nav-link ' : ' nav-link active '
                                                }}
                                            >
                                                {menu.nombre ? menu.nombre : 'Nombre no disponible'}
                                            </NavLink>
                                            {renderMenu(menu)}
                                        </div>
                                    </li>
                                ))}
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/tours' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link '
                                    }}>
                                        Tours
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/nosotros' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link '
                                    }}>
                                        {t("header.about")}
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <NavLink to='/contacto' className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : ' nav-link '
                                    }}>
                                        Contacto
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <DropdownButton
                                        id="language-selector"
                                        variant="transparent"
                                        className="nav-link p-0 bg-transparent"
                                        title={<><span className="ml-2">{i18n.language === 'es' ? <img src="../../assets/images/iconos/pe.svg" className='flags text-white' alt="Perú" /> : <img src="../../assets/images/iconos/us.svg" className='flags' alt="Estados Unidos" />}</span></>}
                                    >
                                        <Dropdown.Item onClick={() => handleChangeLng('es')}>
                                            <img src="../../assets/images/iconos/pe.svg" className='flags' alt="Perú" />Español
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChangeLng('en')}>
                                            <img src="../../assets/images/iconos/us.svg" className='flags' alt="Estados Unidos" />English
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </li>
                                <li className="nav-item d-flex align-items-center text-white">
                                    <Cart></Cart>
                                </li>
                            </Nav>
                        </Col>
                    </Row >
                )
            }

        </>
    )
}

export default Header


