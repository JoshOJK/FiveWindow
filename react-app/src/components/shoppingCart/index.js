import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink} from 'react-router-dom';
import { deleteItem, LoadCart } from "../../store/shoppingCart";
import './shoppingCart.css'



const CartDropDown = () => {
    const dispatch = useDispatch();
    const userCart = useSelector((state) => state.cart.personalCart)
    const sessionUser = useSelector((state) => state.session.user)
    const cartItems = userCart.beeritems


    const deleteCartItem = async (itemId) => {
        await dispatch(deleteItem(itemId))
        await dispatch(LoadCart())
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
            <ul id='cart-items-wrapper'>
                <li>
                    {cartItems?.map((item) => (
                        <div>{item.beer.name} {item.quantity} <span onClick={() => deleteCartItem(item.beer?.id)} class="material-symbols-outlined" id="delete-cart-item">delete_forever</span></div>
                ))}
                </li>
            </ul>
        </div>
        ):(
            <div id="no-cart-items">
                No items in cart
            </div>
        )}
        </>
        )}

        </div>
    )
}

export default CartDropDown;
