import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadPizzas } from "../../store/pizza";
import { LoadBeers } from "../../store/beer";
import fwbcbroll from "../../Images/fwbc_b-roll.mp4"
import cans from "../../Images/fwbc-can-render.png"
import './homePage.css'


const HomePage = () => {
    const dispatch = useDispatch();
    let pizzaObject = useSelector((state) => state.pizza)
    let pizzaArray = Object.values(pizzaObject)
    let beerObject = useSelector((state) => state.beer)
    let beerArray = Object.values(beerObject)


    useEffect(() => {
        dispatch(LoadPizzas())
        dispatch(LoadBeers())
    }, [dispatch])

    return (
        <>
        <video id="broll-video" autoPlay="true" loop muted src={fwbcbroll}>
            </video>
        <div id="homepage-wrapper">
            <div id="center-info">
            <p id='fwbc-title'>Five Window Beer Company</p>
            <span id="under-title"> Est. 2017</span>
            </div>

        </div>
        <div id='about-us'>
            <div id="about-us-title"><h1>Our Mission</h1></div>
            <p id="mission-statement">we are all about serving quality beer and quality pizza in a family friendly environment </p>

        </div>
        <div id='monthy-items'>
            <div id="za-of-month">
            <h2 id="pom-title">Pizza of the Month</h2>
                <div id="pizza-of-month">
                    <img id='pom-img' src={pizzaArray[10]?.pizzaImg} alt="pizza image"></img>
                    <h2 id='pom-name'>
                    <span id='pom-price'>$ {pizzaArray[10]?.price}</span>
                {pizzaArray[10]?.name}</h2>
                </div>
            </div>
        </div>
        <div id="detail-wrapper">
                    <p id="homepage-detail">Explore Downtown Lodi's cozy hub for craft beer lovers, offering a friendly ambiance and outstanding brews, and if you cant decide on one pick five to try with our beer flights. Feeling hungry? Grab a pizza freshly tossed and cooked to perfection in our wood-fired pizza oven. We also have growlers and 16 oz. cans available if you want to take some of our beer to go.</p>
                </div>

            <div id="beertap-title-wrapper">
                <h1 id="beer-on-tap-title">Beer On Tap</h1>
            </div>
        <div id="beer-image-wrapper">
        <img id="beer-can-images" src={cans} />
        </div>
        <div id="beer-of-month">
            <div id='beer-on-tap'>
                {beerArray?.map((beer) => (
                    <div id="one-tap" key={beer?.id}>{beer?.name} - {beer?.abv}%</div>
                ))}
            </div>
        </div>
        <div className="footer">
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
        </>
    )
}

export default HomePage;
