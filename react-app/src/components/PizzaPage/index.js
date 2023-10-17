import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadPizzas } from "../../store/pizza";
import OpenModalButton from "../OpenModalButton";
import DeleteForm from "../deletePizza";
import UpdateForm from "../editPizza";
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
                            <OpenModalButton
                            buttonText="Edit-Pizza"
                            modalComponent={<UpdateForm pizzaId={pizza?.id}/>}
                        />


                            < OpenModalButton
                            buttonText="Delete Menu Item"
                            modalComponent={<DeleteForm pizzaId={pizza?.id}/>} />
                            </>

                        )}
                    </div>
                    </>
                ))}
            </div>
            <div>
                {currentUser?.isAdmin && (
                <>
                <NavLink to='/pizza/create'>
                Create a Pizza
                </NavLink>
                </>
            )}
            </div>
        </div>
    )

}

export default PizzaPage
