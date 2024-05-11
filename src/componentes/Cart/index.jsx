import { useState } from "react"
import { Button, Dropdown, Form, ListGroup } from "react-bootstrap"
import { MdDelete } from "react-icons/md"
import './index.css'
import { FaCartShopping, FaMoneyBill } from "react-icons/fa6"
import { useCart } from "../../Hook/useCart"
import { NavLink } from "react-router-dom"

function CartItem({ imagenprincipal, precio, nombre, removeFromeCart }) {
    return (
        <ListGroup.Item className="">
            <div className="card-information-tour related-tour gap-2 bg-white p-2 rounded d-flex justify-content-between">
                <div className="d-flex gap-2">
                    <img src={imagenprincipal} className='img-icono-tour-info-related' alt="" />
                    <div className="items-information d-grid">
                        <h5 className="item-description-information m-0 fs-18">{nombre}</h5>
                        <h5 className="item-tittle-information">S/. <span className="prices-item-information"> {precio} </span></h5>
                    </div>
                </div>
                <Button variant="" className="button-cart text-white" onClick={removeFromeCart}>
                    <MdDelete />
                </Button>
            </div>
        </ListGroup.Item>
    )
}
function Cart() {
    const { cart, clearCart, removeFromeCart } = useCart();
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleCartDropdown = () => setShowDropdown(!showDropdown);
    return (
        <Dropdown show={showDropdown} onToggle={toggleCartDropdown} className="d-inline cart-button m-0 p-0 text-white">
            <Dropdown.Toggle variant="transparent" id="dropdown-cart" className="text-white">
                <FaCartShopping className="" />
                {cart.length > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '12px',
                    }}>
                        {cart.length}
                    </span>
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Form.Label className="mx-4 font-weight-bold h6" htmlFor="">Tu Carrito</Form.Label>
                <ListGroup variant="flush">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <CartItem key={item.id}
                                removeFromeCart={() => removeFromeCart(item)}
                                {...item}
                            />
                        ))
                    ) : (
                        <Dropdown.Item>Tu carrito está vacío</Dropdown.Item>
                    )}
                </ListGroup>
                <Dropdown.Divider />
                <div className="d-flex gap-2 justify-content-center">
                    <Button className="button-cart text-white" onClick={clearCart}><MdDelete />Vaciar Carrito</Button>
                    <NavLink to='/checkout'>
                        <Button className="button-cart text-white" ><FaMoneyBill /> Pagar</Button>
                    </NavLink>

                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Cart;
