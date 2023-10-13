import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink} from 'react-router-dom';
import { LoadBeers } from "../../store/beer";
import { newCartItem } from "../../store/shoppingCart";

const ShopPage = () => {
    const dispatch = useDispatch();
    let beerObject = useSelector((state) => state.beer)
    let beerArray = Object.values(beerObject)
    let cart = useSelector((state) => state)

    console.log(cart)


    let payload = {
        quantity: 1
    }


    useEffect(() => {
        dispatch(LoadBeers())
    }, [dispatch])


    return (
        <div id="shop-wrapper">
          <div>
                {beerArray?.map((beer) => (
                    <div>
                    <div>{beer?.name}-{beer?.abv}.0%</div>
                    <button onClick={newCartItem(beer?.id, payload)}>Half Keg 89.99$</button>
                    <button onClick={newCartItem(beer?.id, payload)}>Full Keg 189.99$</button>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShopPage;
