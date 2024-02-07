import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { LoadBeers } from "../../store/beer";
import { LoadCart, newCartItem } from "../../store/shoppingCart";
import OpenModalButton from "../OpenModalButton";
import DeleteBeerForm from "../deleteBeer";
import UpdateBeerForm from "../editBeer";
import "./beerPage.css"
import pizzaImg from "../../Images/_DCP2203.jpg"

const BeerPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let beerObject = useSelector((state) => state.beer)
    let currentUser = useSelector((state) => state.session.user)
    let beerArray = Object.values(beerObject)


    let payload = {
        quantity: 1
    }

    const handleKeg = async (beerId, payload) => {
        if (currentUser) {
            await dispatch(newCartItem(beerId, payload))
            await dispatch(LoadCart())
        } else {
            alert("Log-in or Sign-up to add an item to your cart!")
        }

    }


    const checkBeerTap = () => {
        if (beerArray.length >= 15) {
            alert('Maximum beer taps of 15 has been reached')
        } else {
            history.push('/beer/create')
        }
    }


    useEffect(() => {
        dispatch(LoadBeers())
        dispatch(LoadCart())
    }, [dispatch, LoadCart])


    return (
        <div id="beer-wrapper">
            <div id="beer-tap-greeting">
                <h1 id='beer-greeting-title'>OUR BEERS</h1>
                <p id="beer-greeting-info">We are always creating new beers! At the brewery, we keep 15 taps pouring our favorites, best sellers, and new releases.</p>
            </div>

            <div id="beer-tap-grid">
                {beerArray?.map((beer) => (
                    <div id='beer-tap-wrapper'>
                        <div id='beer-info'>{beer?.name}-{beer?.abv}.0%</div>
                        <div id="beer-description">{beer?.description}</div>
                        <div id="shop-wrapper">
                        <button onClick={() => handleKeg(beer?.id, payload)} id='add-to-cart-button'>add to cart</button> <div id="cart-price">Per keg $399.99</div>
                        </div>
                        <div id='edit-delete-container'>
                            {currentUser?.isAdmin && (
                                <>
                                    <OpenModalButton
                                        buttonText={(<span class="material-symbols-outlined">
                                        edit
                                        </span>)}
                                        modalComponent={<UpdateBeerForm beerId={beer?.id} />}
                                    />

                                    <OpenModalButton
                                        buttonText={(<span class="material-symbols-outlined" id="delete-cart-item">delete_forever</span>)}
                                        modalComponent={<DeleteBeerForm beerId={beer?.id} />}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div id='create-button-wrapper'>
                {currentUser?.isAdmin && (
                    <button id="create-beer-button"onClick={checkBeerTap}>
                        create a beer tap
                    </button>
                )}
            </div>

            <div id="hops-wrapper">
                    <div id="hops-info-wrapper">
                    <span class="material-symbols-outlined" id="hops-icon">eco</span>
                    <h1 id="hops-title">Quality Hops</h1>
                    <p id="hops-info">We source the finest hops for our beers and work with local growers to produce Lodi-grown hops.</p>
                    </div>
                    <div id="hops-info-wrapper1">
                    <span class="material-symbols-outlined" id="hops-icon">nutrition</span>
                    <h1 id="hops-title">Fusion Flavors</h1>
                    <p id="hops-info">We blend different hops, fresh fruit, and other ingredients to create unique flavors to suit anyone’s taste.</p>
                    </div>
                    <div id="hops-info-wrapper">
                    <span class="material-symbols-outlined" id="hops-icon">science</span>
                    <h1 id="hops-title">Unique Taste</h1>
                    <p id="hops-info">Our unique brewing process delivers a distinct taste you won’t find anywhere else.</p>
                    </div>
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
                <p id="hour">9 W. Locust St.</p>
                <p id="hour">Lodi, California 95240</p>
                <p id="hour">(209) 224-8036</p>
            </div>
        </div>

        </div>
    )

}

export default BeerPage
