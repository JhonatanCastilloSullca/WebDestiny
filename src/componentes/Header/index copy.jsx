import { useContext, useState } from 'react'
import './index.css'
import { Link, NavLink } from 'react-router-dom';
import Cart from '../Cart';
import { Card, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../Hook/useFetch';
import { GeneralContext } from '../../context/general';
import { DotLoader } from 'react-spinners';
function Header() {
    const { general } = useContext(GeneralContext);
    const GeneralData = general.menus;
    const { i18n } = useTranslation();
    const handleChangeLng = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('lng', lng);
    }

    const [click, setClick] = useState(false);
    const [navbar, setNavbar] = useState(false);



    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
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
            <nav className={navbar ? 'navbar active navbar-expand-lg' : 'navbar navbar-expand-lg'}  >
                <div className="container">
                    <Link to='/' className='navbar-logo' >
                        {navbar ? <img src="../src/assets/images/vertigo-logo-horizontal-2.webp" alt="logo-vertigo" /> : <img className='img-header-logo' src="../src/assets/images/vertigologo2.webp" alt="logo-vertigo" />}
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        x
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto d-flex flex-row">
                            <li className="nav-item d-flex align-items-center text-white">
                                <NavLink to='/' className={({ isActive }) => {
                                    return isActive ? 'nav-link active' : ' nav-link'
                                }}>
                                    Home
                                </NavLink>
                            </li>
                            {GeneralData.map((menu) => (
                                <li className="nav-item d-flex align-items-center text-white" key={menu.id}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="transparent" id={`dropdown-${menu.id}`} className="nav-link p-0">
                                            <div className="nav-item">
                                                <NavLink to='/tours' className={({ isActive }) => {
                                                    return isActive ? 'nav-link active' : ' nav-link'
                                                }}>
                                                    {menu.nombre ? menu.nombre : 'Nombre no disponible'}
                                                </NavLink>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='drpwdpwm-menu'>
                                            <div className="menuvertigo w-100">
                                                <Container className=''>
                                                    <Row className='w-100'>
                                                        <Col md={8}>
                                                            <Row>
                                                                {menu.detalles && menu.detalles.length > 0 ? (
                                                                    menu.detalles.map((categoria) => (
                                                                        <Col key={categoria.id}>
                                                                            <span className='nav-link tittle-categoria-header w-100'>
                                                                                {categoria.categoria.nombre}
                                                                            </span>
                                                                            <Row>
                                                                                <Col className='d-grid gap-2 height-menu'>
                                                                                    {categoria.categoria.tours.map((tour) => (
                                                                                        <NavLink to={`/tours/${tour.id}`} className=' w-100 border-bot-menu' key={tour.id}>
                                                                                            <div className="menu-title-nav">{tour.nombre}</div>
                                                                                        </NavLink>
                                                                                    ))}
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    ))
                                                                ) : (
                                                                    <Col>No hay categorías disponibles</Col>
                                                                )}
                                                            </Row>
                                                        </Col>
                                                        <Col md={4} className='d-flex justify-content-center align-items-center'>
                                                            <Container className='d-flex justify-content-center'>
                                                                <Card style={{ width: '18rem' }}>
                                                                    <Card.Img variant="top" src="https://vertigotravelperu.com/wp-content/uploads/2022/09/manu1.png" />
                                                                </Card>
                                                            </Container>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            ))}
                            <li className="nav-item d-flex align-items-center text-white">
                                <NavLink to='/tours' className={({ isActive }) => {
                                    return isActive ? 'nav-link active' : ' nav-link'
                                }}>
                                    Tours
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex align-items-center text-white">
                                <DropdownButton
                                    id="language-selector"
                                    variant="transparent"
                                    className="nav-link p-0 bg-transparent"
                                    title={<><span className="ml-2">{i18n.language === 'es' ? <img src="../../src/assets/images/iconos/pe.svg" className='flags text-white' alt="Perú" /> : <img src="../../src/assets/images/iconos/us.svg" className='flags' alt="Estados Unidos" />}</span></>}
                                >
                                    <Dropdown.Item onClick={() => handleChangeLng('es')}>
                                        <img src="../../src/assets/images/iconos/pe.svg" className='flags' alt="Perú" />Español
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleChangeLng('en')}>
                                        <img src="../../src/assets/images/iconos/us.svg" className='flags' alt="Estados Unidos" />English
                                    </Dropdown.Item>
                                </DropdownButton>
                            </li>
                            <li className="nav-item d-flex align-items-center text-white">
                                <Cart></Cart>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header


