import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap"
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useContext, useState } from "react";
import { GeneralContext } from "../../context/general";
import CertificadoCarousel from "../../componentes/CertificadoCarousel";
import { useCart } from "../../Hook/useCart";
import { FaCreditCard, FaList } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import PaymentButton from "../../componentes/PaymentButton";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";


function CheckOutPage() {
    const { cart, clearCart, removeFromeCart, updatePax, calculateSubtotal } = useCart();
    const subtotal = calculateSubtotal();
    const { general } = useContext(GeneralContext);
    const GeneralData = general.nosotros;
    const cabeceraTipo = general.certificados;
    const paises = general.paises;
    const handleIncrement = (item) => {
        updatePax(item.id, Number(Number(item.pax) + 1), (Number(Number(item.pax) + 1) * Number(item.precio)));
    };
    const handleDecrement = (item) => {
        if (item.pax > 0) {
            updatePax(item.id, Number(Number(item.pax) - 1), (Number(Number(item.pax) - 1) * Number(item.precio)));
        }
    };
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsTermsAccepted(e.target.checked);
    };
    const [validated, setValidated] = useState(false);
    const [validationMessages, setValidationMessages] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        pais_id: '',
        tipo_documento: '',
        num_documento: '',
        celular: '',
        email: ''
    });

    const handleSubmit = async (event) => {
        let isValid = true;
        let msgs = { ...validationMessages };

        if (!formData.nombre) {
            msgs.nombre = 'Por favor, ingresa tus nombres.';
            isValid = false;
        } else {
            msgs.nombre = '';
        }

        if (!formData.pais_id) {
            msgs.pais_id = 'Por favor, selecciona tu nacionalidad.';
            isValid = false;
        } else {
            msgs.pais_id = '';
        }

        if (!formData.tipo_documento) {
            msgs.tipo_documento = 'Por favor, selecciona tu tipo de documento.';
            isValid = false;
        } else {
            msgs.tipo_documento = '';
        }

        if (!formData.num_documento) {
            msgs.num_documento = 'Por favor, ingresa tu número de documento.';
            isValid = false;
        } else {
            msgs.num_documento = '';
        }

        if (!formData.celular) {
            msgs.celular = 'Por favor, ingresa tu número de celular.';
            isValid = false;
        } else {
            msgs.celular = '';
        }

        if (!formData.email) {
            msgs.email = 'Por favor, ingresa tu correo electrónico.';
            isValid = false;
        } else {
            msgs.email = '';
        }

        setValidationMessages(validationMessages);
        setFormSubmitted(isValid);

        if (isValid) {

            try {
                handleNextCard();
                const dataToSend = {
                    detalles: cart,
                    cliente: formData,
                    total: subtotal
                };
                const response = await fetch('https://api.machupicchudestinytravel.com/api/niubiz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNmJjZWFhNWFlYWRkZTQyNDY3ZDZkYmJmMTVlMDhkMmVjMjZkZGM4Yjc5ZDZlZWM5NGIwODliOWRlMDUzNTdlMmE5YWUyOTc4ZjVhYzM5MTQiLCJpYXQiOjE2OTEwMDUwMDMuMjI5NzQzLCJuYmYiOjE2OTEwMDUwMDMuMjI5NzQ2LCJleHAiOjE3MjI2Mjc0MDMuMTA4MzU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VPsULN8PnrW5EzFxiYlyn5R8ML4w0le-FvZFf1IxMOj2o2NVMUg-EERqJdKV3YWn2NquVgW8-SOPkmCtWJ4kfA_UZdaJ2JUkm0qo39cSNLt2AylXP8s4_pBK6cVBI8xo98fTkcoXgj-hDk6B04t4S2wIu7ddxSfgVdcWbVorN4Woac4i40d3xf6Iu-DnOfs6m5RKGDpOrzExQDrIn6A5_efpcNf1-I3rGgf00aAar2vKtdtZjFAzcVpDKMLm36Q-A0Yl54uEuC_e2RI2nsRhjtK7P0CwSPXzYyz29lU_k47WWJp4nVb0prt_-D5OHHk81LkFZqTiuiw5AB88_l3q65PG20oo8HSTW2c3hV1XPFHwhdVsjLncFX3TWhHUyHAIN48qBOiXl9JVmfeUj6t6uTurjRnaH-kykSke2dUPE77gCiMsLDUYA1dMD8EU42Y3F1tLWs4_CoXiwpjR2TGdjACY4FBHPwOAyrBpLIUKypeBcx3xrWcU2uZS7iTtQS_C2uhGyeMy0xSeBr0S0GICoJmiHmRUMc9gEHzlv40ObZpncXmw7VX1Txc5-DS6Y-GgjKjIPmmVQOWSJbjU7OqMtSaGyjmOTtECwgtlmFpfwEi0_g8L8T2OzgZVYOOROkzxOYnuCB1NLfj2N-NFcZ1cXUvB915l8C-v5ZD9Uulmxmsi'
                    },
                    body: JSON.stringify(dataToSend)
                });
                if (response.ok) {
                    const data = await response.json();
                    setPaymentData(data);
                } else {
                    console.error('Error al enviar los datos In:', response.status);
                }
            } catch (error) {
                console.error('Error al enviar los datos Out:', error);
            }
        } else {
            setValidated(true);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [activeCard, setActiveCard] = useState('checklist');
    const handleSetActiveCard = (cardId) => {
        setActiveCard(cardId);
    };
    const handleNextCard = () => {
        const cardSequence = ['checklist', 'user', 'credit'];
        const currentIndex = cardSequence.indexOf(activeCard);
        const nextIndex = (currentIndex + 1) % cardSequence.length;
        setActiveCard(cardSequence[nextIndex]);
    };

    return (
        <>
            <div className="hero-wrap js-mediumheight" style={{ backgroundImage: `url('${GeneralData.image_principal}')` }}>
                <div className="overlay-real"></div>
                <Container className="position-relative">
                    <Row className="js-mediumheight d-flex justify-content-center align-items-center">
                        <div className="principal-hero-title d-flex flex-column justify-content-center align-items-center">
                            <h1>Realiza tu reserva</h1>
                            <p className="principal-hero-text">{GeneralData.titulo}</p>
                        </div>
                    </Row>
                </Container>
            </div>

            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container className="text-center">
                    <div className="login-box Booking-box">
                        <Card className="m-2">
                            <div className="d-flex justify-content-around w-50 m-auto p-2">
                                <Button className={`rounded-circle height-circle-wizard bg-gray ${activeCard === 'checklist' ? 'bg-primary' : ''}`} onClick={() => handleSetActiveCard('checklist')}>
                                    <FaList />
                                </Button>
                                <Button className={`rounded-circle height-circle-wizard bg-gray ${activeCard === 'user' ? 'bg-primary' : ''}`} onClick={() => handleSetActiveCard('user')}>
                                    <FaUserCircle />
                                </Button>
                                <Button className={`rounded-circle height-circle-wizard bg-gray ${activeCard === 'credit' ? 'bg-primary' : ''}`} onClick={() => handleSetActiveCard('credit')}>
                                    <FaCreditCard />
                                </Button>
                            </div>
                        </Card>

                        {activeCard === 'checklist' && (
                            <Card className="m-2">
                                <Card.Header className="border-0">
                                    <div className="head-cart d-flex gap-2 align-items-center">
                                        <FaShoppingCart />
                                        <span className="text-muted">Actividades en lista</span>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    {cart.length > 0 ? (
                                        cart.map((item) => (
                                            <div className="d-flex justify-content-between border-bottom m-2" key={item.id}>
                                                <div className="img-contenido">
                                                    <div className="imagen-cart-product">
                                                        <img className="item_image_product" src={item.imagenprincipal} alt={`Imagen de ${item.nombre}`} />
                                                    </div>
                                                    <div className="description-cart-product">
                                                        <h2 className="description-text-nombre-tour">{item.nombre}</h2>
                                                        <h3 className="description-text-categoria-tour">Categoria: {item.categoria ? item.categoria.nombre : 'Sin categoría'}</h3>
                                                        <h3 className="description-text-ubicaciones-tour">Ubicaciones: {(item.ubicaciones && item.ubicaciones.map(u => u.nombre).join(", ")) || 'No especificadas'}</h3>
                                                    </div>
                                                </div>
                                                <div className="precio-cart-product position-relative ">
                                                    <h2 className="description-text-precio-tour">S/ {item.price}</h2>
                                                    <h3 className="description-text-fecha-tour">Fecha: {item.fecha}</h3>
                                                    <InputGroup className="mb-3 justify-content-center ">
                                                        <Button variant="outline-secondary" className="btn-left-cart" onClick={() => handleDecrement(item)}>
                                                            -
                                                        </Button>
                                                        <FormControl
                                                            type="text"
                                                            value={item.pax}
                                                            onChange={(event) => handleInputChange(event, item)}
                                                            className="input-text-cart-number"
                                                        />
                                                        <Button variant="outline-secondary" className="btn-right-cart" onClick={() => handleIncrement(item)}>
                                                            +
                                                        </Button>
                                                    </InputGroup>
                                                    <Button variant="outline-danger" className="position-absolute top-0 end-0 border-0" onClick={() => removeFromeCart(item)}><MdDelete /></Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No hay productos en el carrito</div>
                                    )}
                                    <div className="d-flex justify-content-end border-bottom m-2">
                                        <h2 className="description-text-subtotal-tour">Subtotal: {subtotal}</h2>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between align-items-center">
                                    <span className="cart-notificacion-terminos">*Terminos y Condiciones</span>
                                    <Button type="button" onClick={handleNextCard}>Siguiente</Button>
                                </Card.Footer>
                            </Card>
                        )}
                        {activeCard === 'user' && (
                            <Card className="m-2">
                                <Form noValidate validated={validated}>
                                    <Card.Header className="border-0">
                                        <div className="head-cart d-flex gap-2 align-items-center">
                                            <FaUserCircle />
                                            <span className="text-muted">Datos del Pasajero</span>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Nombres y Apellidos"
                                                    name="nombre"
                                                    value={formData.nombre}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">{formSubmitted && !formData.nombre && 'Por favor, ingresa tus nombres.'}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                                <Form.Control
                                                    as="select"
                                                    required
                                                    name="pais_id"
                                                    value={formData.pais_id}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Nacionalidad</option>
                                                    {paises.map((pais, index) => (
                                                        <option key={index} value={pais.id}>{pais.nombre}</option>
                                                    ))}
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">{formSubmitted && !formData.pais_id && 'Por favor, selecciona tu nacionalidad.'}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                                <Form.Control
                                                    as="select"
                                                    required
                                                    name="tipo_documento"
                                                    value={formData.tipo_documento}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Documento</option>
                                                    <option value="DNI">DNI</option>
                                                    <option value="RUC">RUC</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">{formSubmitted && !formData.tipo_documento && 'Por favor, selecciona tu tipo de documento.'}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="N° Documento"
                                                    name="num_documento"
                                                    value={formData.num_documento}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">{formSubmitted && !formData.num_documento && 'Por favor, ingresa tu número de documento.'}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="6" controlId="validationCustom06">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Celular"
                                                    name="celular"
                                                    value={formData.celular}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">{formSubmitted && !formData.celular && 'Por favor, ingresa tu número de celular.'}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom07">
                                                <Form.Control
                                                    required
                                                    type="email"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">{formSubmitted && !formData.email && 'Por favor, ingresa tu correo electrónico.'}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between align-items-center">
                                        <span className="cart-notificacion-terminos">*Terminos y Condiciones</span>
                                        <Button type="button" onClick={handleSubmit}>Siguiente</Button>
                                    </Card.Footer>
                                </Form>

                            </Card>

                        )}
                        {activeCard === 'credit' && (
                            <Card className="m-2">
                                <Card.Header className="border-0">
                                    <div className="head-cart d-flex gap-2 align-items-center">
                                        <FaCreditCard />
                                        <span className="text-muted">Datos del Pasajero</span>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <h5 className="card-title">Ticket de Reserva</h5>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p><strong>Nombres y Apellidos: </strong>{formData.nombre} </p>
                                            <p><strong>Fecha:</strong> 02/05/2024</p>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex">
                                        <Form.Check
                                            type='checkbox'
                                            id={`check-terminos`}
                                            label={
                                                <>
                                                    <b>Aceptar los</b>
                                                    <span className="cart-notificacion-terminos"> *Términos y Condiciones</span>
                                                </>
                                            }
                                            checked={isTermsAccepted}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                    {isTermsAccepted && paymentData && (
                                        <PaymentButton
                                            sessiontoken={paymentData.sessionKey}
                                            merchantid={paymentData.merchant_id}
                                            purchasenumber={paymentData.reserva_id}
                                            amount={paymentData.pago}
                                            link_js={paymentData.link_js}
                                            route={paymentData.route}
                                        />
                                    )}
                                </Card.Footer>
                            </Card>
                        )}
                    </div>
                </Container>
            </div >
            <div className="ftco-section services-section pt-4 descriptio-tour-container">
                <Container className="text-center">
                    <Row className="mb-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
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
        </>
    )
}

export default CheckOutPage
