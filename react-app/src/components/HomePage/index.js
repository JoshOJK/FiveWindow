import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadPizzas } from "../../store/pizza";
import { LoadBeers } from "../../store/beer";

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
        <div>
            <div>
                <h2>{pizzaArray[4]?.name}</h2>
            </div>
            <div>
                {beerArray?.map((beer) => (
                    <div>{beer?.name}-{beer?.abv}.0%</div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;
