import { Card, Form, Alert } from "react-bootstrap";
import { useCart } from "../../Hook/useCart";
import { useState } from "react";

function CardFormulario({ tour }) {

    const { addToCart, removeFromeCart, cart } = useCart();
    const [fecha, setFecha] = useState("");
    const [pax, setPax] = useState("");
    const [error, setError] = useState({});

    const checkTourInCart = tour => {
        return cart.some(item => item.id === tour.id);
    }

    const isToursInCart = checkTourInCart(tour);

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
        setError({ ...error, fecha: "" });
    }

    const handlePaxChange = (e) => {
        setPax(e.target.value);
        setError({ ...error, pax: "" });
    }

    const handleSubmit = () => {
        let isValid = true;
        if (!fecha) {
            setError(prevError => ({ ...prevError, fecha: "*Ingrese una fecha valida" }));
            isValid = false;
        }
        if (!pax) {
            setError(prevError => ({ ...prevError, pax: "*Requiere 1 pasajero min" }));
            isValid = false;
        }
        if (isValid) {
            if (isToursInCart) {
                removeFromeCart(tour);
            } else {

                const price = tour.precio * pax;
                addToCart(tour, fecha, pax, price);
            }
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h3 className="box-title">Reserva con nosotros</h3>
                    <div>
                        <h2 className="producto-tittle-information text-center text-primary">{tour.nombre}</h2>
                        <p className="text-muted text-center"><span className="text-danger h2 fw-bolder">{tour.precio}</span> x pax</p>
                        <div className="d-flex flex-column">
                            <div className="div-formulario">
                                <span>Fecha:</span>
                                <Form.Control
                                    type="date"
                                    placeholder=""
                                    className={`input-formulario fs-12 ${error.fecha ? 'is-invalid' : ''}`}
                                    value={fecha}
                                    onChange={handleFechaChange}
                                />
                            </div>
                            {error.fecha && (
                                <div className="error-message">
                                    {error.fecha}
                                </div>
                            )}
                        </div>
                        <div className="d-flex flex-column">
                            <div className="div-formulario">
                                <span>Pax:</span>
                                <Form.Control
                                    type="text"
                                    placeholder="1"
                                    className={`input-formulario fs-12 ${error.pax ? 'is-invalid' : ''}`}
                                    value={pax}
                                    onChange={handlePaxChange}
                                    isInvalid={!!error.pax}
                                />
                            </div>
                            {error.fecha && (
                                <div className="error-message">
                                    {error.pax}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="submit_group">
                        <button onClick={handleSubmit} className="booking_form_submit">
                            {
                                isToursInCart
                                    ? "Quitar de la reserva"
                                    : "Reservar Ahora"
                            }
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardFormulario;
