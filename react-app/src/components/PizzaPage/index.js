import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadPizzas } from "../../store/pizza";

const PizzaPage = () => {
    const dispatch = useDispatch();
    let pizzaObject = useSelector((state) => state.pizza)
    let pizzaArray = Object.values(pizzaObject)



    useEffect(() => {
        dispatch(LoadPizzas())
    }, [dispatch])


    return (
        <div>
            <div>
                {pizzaArray?.map((pizza) => (
                    <>
                    <div>{pizza?.name}-{pizza?.price}$</div>
                    <div>{pizza?.description}</div>
                    <div>{pizza?.ingredientList}</div>
                    </>
                ))}
            </div>
        </div>
    )

}

export default PizzaPage
