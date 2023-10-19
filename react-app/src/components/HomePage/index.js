import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadPizzas } from "../../store/pizza";
import { LoadBeers } from "../../store/beer";
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
        <div id="homepage-wrapper">
            <div id="center-info">
            <p id='fwbc-title'>Five Window Beer Company</p>
            <span id="under-title"> Est. 2017</span>
            </div>

        </div>

        <div id='monthy-items'>
            <div id="za-of-month">
                <div id="pizza-of-month">
                    <p id="pom-title">Pizza of the Month</p>
                    <img id='pom-img' src={pizzaArray[9]?.pizzaImg} alt="pizza image"></img>
                    <h2 id='pom-name'>
                    <span id='pom-price'>$ {pizzaArray[9]?.price}</span>
                {   pizzaArray[9]?.name}</h2>
                </div>
            </div>
            <div id="za-of-month">
            <div id='beer-on-tap'>
                <p id="beer-on-tap-title">Beer on Tap</p>
                {beerArray?.map((beer) => (
                    <div id="one-tap" key={beer?.id}>{beer?.name}-{beer?.abv}.0%</div>
                ))}
            </div>
            </div>
        </div>
        <div id='about-us'>
            <p id="homepage-detail">Explore Downtown Lodi's cozy hub for craft beer lovers, offering a friendly ambiance and outstanding brews.</p>
            <div>Our mission</div>
            <p>we are all about serving qualtity beer in a family friendly environment </p>
        </div>
        </>
    )
}

export default HomePage;
