import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadPizzas } from "../../store/pizza";
import OpenModalButton from "../OpenModalButton";
import DeleteForm from "../deletePizza";
import UpdateForm from "../editPizza";
import "./pizzaPage.css"
import { useHistory } from "react-router-dom";

const PizzaPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let pizzaObject = useSelector((state) => state.pizza)
    let pizzaArray = Object.values(pizzaObject)
    let currentUser = useSelector((state) => state.session.user)

    console.log(pizzaArray)

    const createPizza = () => {
        history.push("/pizza/create")
    }

    useEffect(() => {
        dispatch(LoadPizzas())
    }, [dispatch])


    return (
        <div id="pizza-wrapper">
            <div id="pizza-header">
                <h1 id='pizza-heading-title'>Our Pizzas</h1>
                <p id='pizza-heading-info'>We hand make every pizza to order in our woodfired oven that cooks every pizza to perfection, we also craft a new pizza every month with related ingredients to the season.</p>
            </div>
            <div id="pizza-tiles-wrapper">
                {pizzaArray?.map((pizza) => (
                    <div id="single-pizza-wrapper">
                    <div id="pizza-title">{pizza?.name}-{pizza?.price}$</div>
                    <div id="pizza-description">{pizza?.description}</div>
                    <img id="pizza-image-5" src={pizza?.image_url[0]?.pizzaImg} />
                    <div id="pizza-ingredients">{pizza?.ingredientList}</div>
                    <div id='edit-delete-container'>
                        {currentUser?.isAdmin && (
                            <>
                            <OpenModalButton
                            buttonText={(<span class="material-symbols-outlined">
                            edit
                            </span>)}
                            modalComponent={<UpdateForm pizzaId={pizza?.id}/>}
                        />


                            < OpenModalButton
                            buttonText={(<span class="material-symbols-outlined" id="delete-cart-item">delete_forever</span>)}
                            modalComponent={<DeleteForm pizzaId={pizza?.id}/>} />
                            </>

                        )}
                    </div>
                    </div>
                ))}
            </div>
            <div id="create-wrapper-p">
                {currentUser?.isAdmin && (
                <>
                <button id="create-pizza-link" onClick={createPizza}>
                Create a Pizza
                </button>
                </>
            )}
            </div>
            <div id="pizza-info-wrapper">
                <div id="pizza-info">
                <span id='pizza-page-icon' class="material-symbols-outlined">breakfast_dining</span>
                    <h2 id="pizza-page-info">Hand-Rolled Dough</h2>
                    <p id="pizza-page-details">We make our dough in house everyweek and hand-roll it for every pizza that makes it to your plate to ensure the best quality pizza.</p>
                </div>
                <div id="pizza-info">
                <span id='pizza-page-icon' class="material-symbols-outlined">home_pin</span>
                    <h2 id="pizza-page-info">Locally sourced ingredients</h2>
                    <p id="pizza-page-details">We locally source every fruit or vegetable every week that is topped on your pizza so we never have to settle for frozen ingredients. </p>
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

export default PizzaPage
