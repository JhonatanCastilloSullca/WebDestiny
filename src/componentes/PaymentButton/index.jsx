
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";


const PaymentButton = ({ sessiontoken, merchantid, purchasenumber, amount, route, link_js }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // Función para cargar el script de Niubiz
        const loadScript = () => {
            if (window.VisanetCheckout) {
                setScriptLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = link_js;
            script.onload = () => {
                setScriptLoaded(true);
            };
            document.body.appendChild(script);
        };

        loadScript();

        return () => {
        };
    }, []);

    const openPaymentForm = () => {
        if (scriptLoaded && window.VisanetCheckout) {
            window.VisanetCheckout.configure({
                sessiontoken: sessiontoken,
                channel: 'web',
                merchantid: merchantid,
                purchasenumber: purchasenumber,
                amount: amount,
                expirationminutes: '20',
                timeouturl: 'about:blank',
                merchantlogo: 'img/comercio.png',
                formbuttoncolor: '#000000',
                action: route,
                complete: function (params) {
                    if (params.codResultado === '0') {
                        console.log('Pago realizado con éxito');
                    } else {
                        console.error('El pago falló:', params.mensajeResultado);
                    }
                }
            });
            window.VisanetCheckout.open();
        }
    };


    return (
        <Button
            variant="primary"
            onClick={openPaymentForm}
            disabled={!scriptLoaded}
        >
            Pagar
        </Button>
    );
};




export default PaymentButton;
