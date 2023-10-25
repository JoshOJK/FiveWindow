import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink} from 'react-router-dom';
import { LoadBeers } from "../../store/beer";
import { LoadCart, newCartItem } from "../../store/shoppingCart";
import "./shopPage.css"

const ShopPage = () => {
    const dispatch = useDispatch();
    let beerObject = useSelector((state) => state.beer)
    let beerArray = Object.values(beerObject)
    let cart = useSelector((state) => state.cart)
    const sessionUser = useSelector((state) => state.session.user)


    let payload = {
        quantity: 1
    }

    const handleKeg = async (beerId, payload) => {
        if (sessionUser) {
            await dispatch(newCartItem(beerId, payload))
            await dispatch(LoadCart())
        } else {
            alert("Log-in or Sign-up to add an item to your cart!")
        }

    }



    useEffect(() => {
        dispatch(LoadBeers())
        dispatch(LoadCart())
    }, [dispatch, LoadBeers, LoadCart])


    return (
        <div id="shop-wrapper">
            <div id='shop-page-wrapper'><h1 id="shop-header">Shop</h1></div>
            <div id='shop-page-wrapper'>
                <p id="shop-info">Buy our craft beer by the keg (15.5 gallons) for all of you party and get together needs.</p>
            </div>
          <div id='shop-items-4'>
                {beerArray?.map((beer) => (
                    <div id='shop-items'>
                    <div id="beer-title">{beer?.name}-{beer?.abv}.0%</div>
                    <button onClick={() => handleKeg(beer?.id, payload)} id='add-to-cart-button'>add to cart $499.99</button>
                    </div>
                ))}
            </div>
            <div id='shop-page-wrapper'>
                <p id="shop-info">By purchasing online you skip the wait in-store and walk in when your keg(s) are ready for you!</p>
                </div>
            <div className="footer">
            <div id="store-hours">
                <h2 id="hours-title">Brewery Hours</h2>
                <p id="hour">Monday	5:00 pm – 9:00 pm</p>
                <p id="hour">Tuesday	3:00 pm – 9:00 pm</p>
                <p id="hour">Wednesday	3:00 pm – 9:00 pm</p>
                <p id="hour">Thursday	3:00 pm – 9:00 pm</p>
                <p id="hour">Friday	12:00 pm – 11:00 pm</p>
                <p id="hour">Saturday	11:00 am – 11:00 pm</p>
                <p id="hour">Sunday	11:00 am – 8:00 pm</p>
            </div>

            <div>
            <a target="_blank" href="https://www.facebook.com/fivewindowbeerco/">
            <div className="button">
            <div className="icon">
                    <i class="fab
                    fa-facebook"></i>
                </div>
                <span>Facebook</span>
            </div>
            </a>

            <a target="_blank" href="https://www.instagram.com/fivewindowbeerco/">
            <div className="button">
                <div className="icon">
                <i class="fa-brands fa-instagram"></i>
                </div>
                <span>Instagram</span>
            </div>
            </a>


            <a target="_blank" href="https://www.yelp.com/biz/five-window-beer-co-lodi-3">
            <div className="button">
                <div className="icon">
                    <i class="fab
                    fa-yelp"></i>
                </div>
                <span>Yelp</span>
            </div>
            </a>
            </div>
            <div id="visit-us">
                <h1 id="hours-title">Visit Our Brewery</h1>
                <p>9 W. Locust St.</p>
                <p>Lodi, California 95240</p>
                <p>(209) 224-8036</p>
            </div>
        </div>
        </div>
    )

}

export default ShopPage;
