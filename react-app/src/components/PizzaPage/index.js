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
                    <img src={pizza?.pizzaImg} />
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

export default PizzaPage
