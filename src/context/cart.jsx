/* eslint-disable no-unreachable */
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")

export function CartProvider({ children }) {
    const [cart, setCart] = useState(cartFromLocalStorage)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    const addToCart = (tour, fecha, pax, price) => {

        const tourInCartIndex = cart.findIndex(item => item.id === tour.id);
        if (tourInCartIndex >= 0) {
            const newCart = structuredClone(cart);
            newCart[tourInCartIndex].quantity += 1;
            newCart[tourInCartIndex].price += price;
            return setCart(newCart);
        }
        setCart(prevState => ([
            ...prevState,
            {
                ...tour,
                quantity: 1,
                fecha,
                pax,
                price,
            }
        ]));
    }

    const removeFromeCart = tour => {
        setCart(prevState => prevState.filter(item => item.id != tour.id))
    }
    const clearCart = () => {
        setCart([])
    }

    const updatePax = (productId, newPax, newPrice) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                return { ...item, pax: newPax, price: newPrice };
            }
            return item;
        });
        setCart(updatedCart);
    };
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromeCart, updatePax, calculateSubtotal }}>
            {children}
        </CartContext.Provider>
    )
}