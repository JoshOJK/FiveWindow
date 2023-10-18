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
        <div id="homepage-wrapper">
            <div>
                <h2>{pizzaArray[10]?.name}</h2>
                <p>{pizzaArray[10]?.price} $</p>
                <img src={pizzaArray[10]?.pizzaImg} alt="pizza image"></img>
            </div>
            <h1>
                Five Window Beer Company
            </h1>
            <p>Explore Downtown Lodi's cozy hub for craft beer lovers, offering a friendly ambiance and outstanding brews.</p>
            <div>
                {beerArray?.map((beer) => (
                    <div>{beer?.name}-{beer?.abv}.0%</div>
                ))}
            </div>

            <div>About Us</div>

        </div>
    )
}

export default HomePage;
