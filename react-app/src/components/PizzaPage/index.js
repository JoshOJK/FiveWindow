import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadPizzas } from "../../store/pizza";
import "./pizzaPage.css"

const PizzaPage = () => {
    const dispatch = useDispatch();
    let pizzaObject = useSelector((state) => state.pizza)
    let pizzaArray = Object.values(pizzaObject)
    let currentUser = useSelector((state) => state.session.user)



    useEffect(() => {
        dispatch(LoadPizzas())
    }, [dispatch])


    return (
        <div id="pizza-wrapper">
            <div>
                {pizzaArray?.map((pizza) => (
                    <>
                    <div>{pizza?.name}-{pizza?.price}$</div>
                    <div>{pizza?.description}</div>
                    <div>{pizza?.ingredientList}</div>
                    <div>
                        {currentUser?.isAdmin && (
                            <>
                            <NavLink to={`/pizza/${pizza?.id}/edit`}>Edit Pizza</NavLink>
                            </>
                        )}
                    </div>
                    </>
                ))}
            </div>
        </div>
    )

}

export default PizzaPage
