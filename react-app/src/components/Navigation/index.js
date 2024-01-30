import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
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
                    <NavLink id="nav-bar-item" exact to="/"><img id="home-page-icon" src='https://cdn.discordapp.com/attachments/1115823811116400650/1161131599476293683/fojosh2.png?ex=65372f12&is=6524ba12&hm=43663afb1210db2e01ad0eb883d9fcaf384fd6afc61d45472eb8a9af45fd123a&'></img></NavLink>
                </li>
                <li>
                    <NavLink id="nav-bar-item" to='/pizza'><span class="material-symbols-outlined nav">local_pizza</span>Pizza</NavLink>
                </li>
                <li>
                    <NavLink id="nav-bar-item" to='/shop'><span class="material-symbols-outlined nav">shopping_bag</span>Shop</NavLink>
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
