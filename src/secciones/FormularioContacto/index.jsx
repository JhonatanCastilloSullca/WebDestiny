import { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function FormularioContacto({ handleSubmit }) {
    const { t } = useTranslation();
    const [validated, setValidated] = useState(false);

    const handleFormSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        handleSubmit(event); // Llama a la función handleSubmit pasada como prop
    };

    return (
        <div className="ftco-section services-section pt-4 descriptio-tour-container">
            <Container>
                <Row>
                    <Col md={12}>
                        <h6 className="section-title text-primary text-uppercase text-center">Contáctanos</h6>
                        <h6 className="section-subtitle text-gray text-uppercase text-center">Un asesor de Destiny Travel se pondrá en contacto contigo pronto</h6>
                        <Form noValidate className="text-center my-4" validated={validated} onSubmit={handleFormSubmit}>
                            <Row className="">
                                <Form.Group as={Col} md="6" className='' controlId="formNombre">
                                    <Form.Control type="text" placeholder="Nombre" required />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingresa tu nombre.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" className='' controlId="formEmail">
                                    <Form.Control type="email" placeholder="Email" />
                                </Form.Group>
                            </Row>
                            <Row className="">
                                <Form.Group as={Col} md="6" className='pt-4' controlId="formCelular">
                                    <Form.Control type="tel" placeholder="Celular" required />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingresa tu número de celular.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" className='pt-4' controlId="formAsunto">
                                    <Form.Control type="text" placeholder="Asunto" required />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingresa el asunto.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className='pt-4' controlId="formMensaje">
                                <Form.Control as="textarea" rows={3} placeholder="Mensaje" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='mt-4'>
                                {t("formulario.enviar-mensaje")}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FormularioContacto;
