import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import fojosh2 from '../../img/fojosh2.png'
import ProfileButton from './ProfileButton';
import CartDropDown from '../shoppingCart';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [openCart, setOpenCart] = useState(false);

    const handleDropDown = () => {
        setOpenCart(!openCart);
    }

    const handleCloseCart = () => {
        setOpenCart(false);
    }

    return (
        <>
            <ul id='nav-bar-wrapper'>
                {isLoaded && (
                    <li id='profile-button'>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
                <li>
                    <NavLink id="nav-bar-item" exact to='/'><span class="material-symbols-outlined nav">home</span>Home</NavLink>
                </li>
                <li>
                    <NavLink id="nav-bar-item" to='/beer'><span class="material-symbols-outlined nav">water_full</span>Beer On Tap</NavLink>
                </li>
                <li>
                <NavLink id="nav-bar-item" exact to="/"><img id="home-page-icon" src={fojosh2} alt='home-page-icon' /></NavLink>

                </li>
                <li>
                    <NavLink id="nav-bar-item" to='/pizza'><span class="material-symbols-outlined nav">local_pizza</span>Pizza</NavLink>
                </li>
                <li>
                    <NavLink id="nav-bar-item" to='/reviews'><span class="material-symbols-outlined">rate_review</span>Reviews</NavLink>
                </li>
                <li onClick={handleDropDown}>
                    <span id="nav-bar-item"><span class="material-symbols-outlined nav">shopping_cart</span>Cart</span>
                </li>
            </ul>
            {openCart && <CartDropDown handleCloseCart={handleCloseCart} />}
        </>
    );
}

export default Navigation;
