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
                <Container>
                    <div className="drpwdpwm-menu">
                        <ul className="menuvertigo">
                            {menu.detalles && menu.detalles.length > 0 ? (
                                menu.detalles.map((categoria) => (
                                    <li key={categoria.id}>
                                        <span className='nav-link tittle-categoria-header'>
                                            {categoria.categoria.nombre}
                                        </span>
                                        <ul className='height-menu'>
                                            {categoria.categoria.tours.map((tour) => (
                                                <li key={tour.id}>
                                                    <NavLink
                                                        to={`/tours/${tour.id}`}
                                                        className='border-bot-menu'
                                                    >
                                                        <div className="menu-title-nav">{tour.nombre}</div>
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))
                            ) : (
                                <li>No hay categorías disponibles</li>
                            )}
                        </ul>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img
                                src="https://vertigotravelperu.com/wp-content/uploads/2022/09/manu1.png"
                                alt="imagen"
                                className='img-fluid'
                            />
                        </div>
                    </div>
                </Container>
            );
        }
        return null;
    };



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
    const { data, loading, error } = useFetch("http://192.168.1.22/api/categorias", requestOptions);
    const categorias = data;
    window.addEventListener('scroll', changeBackground);
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
                                            to='/tours'
                                            className={({ isActive }) => {
                                                return isActive ? 'nav-link active' : ' nav-link active'
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
                                    return isActive ? 'nav-link active' : ' nav-link active'
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


