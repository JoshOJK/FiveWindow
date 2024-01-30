import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import { deleteItem, LoadCart, newCartItem } from "../../store/shoppingCart";
import './shoppingCart.css'

const CartDropDown = ({ handleCloseCart }) => {
    const dispatch = useDispatch();
    const userCart = useSelector((state) => state.cart.personalCart)
    const sessionUser = useSelector((state) => state.session.user)
    const cartItems = userCart.beerItems
    const [userCartItems, setCartItems] = useState([]);

    let payload = {
        quantity: 1
    }

    let reducedPayload = {
        quantity: -1
    }

    const checkout = async (cartItems) => {
        for (let item of cartItems) {
            await dispatch(deleteItem(item.beer.id))
            await dispatch(LoadCart())
        }
        alert('Feature coming soon!')
    }

    const deleteCartItem = async (itemId) => {
        await dispatch(deleteItem(itemId))
        await dispatch(LoadCart())
    }

    const increaseQuantity = async (itemId) => {
        await dispatch(newCartItem(itemId, payload))
        await dispatch(LoadCart())
    }

    const decreaseQuantity = async (itemId, userCartItems) => {
        await dispatch(newCartItem(itemId, reducedPayload));
        await dispatch(LoadCart());
        const updatedCartItems = userCartItems.map(item => {
            if (item.beer.id === itemId) {
                return {...item, quantity: item.quantity - 1};
            }
            return item;
        });
        setCartItems(updatedCartItems);
        for (let item of updatedCartItems) {
            if (item.quantity === 0) {
                await dispatch(deleteItem(item.beer.id));
                await dispatch(LoadCart());
            }
        }
    }

    useEffect(() => {
        dispatch(LoadCart())
    }, [dispatch])

    return (
        <div id="Dropdown-container-content">
            {cartItems && (
                <>
                    {cartItems?.length ? (
                        <div id="Cart-Wrapper-dropdown">
                            <span className="material-symbols-outlined" id="dropdown-close" onClick={handleCloseCart}>close</span>
                            <ul id='cart-items-wrapper'>
                                <li>
                                    {cartItems?.map((item) => (
                                        <div id="cart-wrapper">
                                            <div id="cart-info">
                                                <div id="cart-item">{item.beer.name}</div>
                                                <div id="quantity-checker">
                                                <span id="add-one-quantity" onClick={() => decreaseQuantity(item.beer.id, cartItems)} className="material-symbols-outlined">remove</span>
                                                    <div id="cart-item">{item.quantity}</div>
                                                    <span id="add-one-quantity" onClick={() => increaseQuantity(item.beer.id)} className="material-symbols-outlined">add</span>
                                                </div>
                                                <span onClick={() => deleteCartItem(item.beer?.id)} className="material-symbols-outlined" id="delete-cart-item">delete_forever</span>
                                            </div>
                                        </div>
                                    ))}
                                </li>
                            </ul>
                            <div id="checkout-button-wrapper">
                                <button onClick={() => checkout(cartItems)} id="checkout-button">Checkout</button>
                            </div>
                        </div>
                    ) : (
                        <>
                        <span className="material-symbols-outlined" id="dropdown-close" onClick={handleCloseCart}>close</span>
                        <div id="no-cart-items">
                            No items in cart
                        </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default CartDropDown;
