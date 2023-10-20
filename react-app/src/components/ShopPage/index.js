import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink} from 'react-router-dom';
import { LoadBeers } from "../../store/beer";
import { LoadCart, newCartItem } from "../../store/shoppingCart";

const ShopPage = () => {
    const dispatch = useDispatch();
    let beerObject = useSelector((state) => state.beer)
    let beerArray = Object.values(beerObject)
    let cart = useSelector((state) => state.cart)
    const sessionUser = useSelector((state) => state.session.user)


    let payload = {
        quantity: 1
    }

    const handleKeg = async (beerId, payload) => {
        if (sessionUser) {
            await dispatch(newCartItem(beerId, payload))
            await dispatch(LoadCart())
        } else {
            alert("Log-in or Sign-up to add an item to your cart!")
        }

    }



    useEffect(() => {
        dispatch(LoadBeers())
        dispatch(LoadCart())
    }, [dispatch, LoadBeers, LoadCart])


    return (
        <div id="shop-wrapper">
          <div>
                {beerArray?.map((beer) => (
                    <div>
                    <div>{beer?.name}-{beer?.abv}.0%</div>
                    <button onClick={() => handleKeg(beer?.id, payload)}>Half Keg 89.99$</button>
                    <button onClick={() => handleKeg(beer?.id, payload)}>Full Keg 189.99$</button>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShopPage;
