import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadBeers } from "../../store/beer";

const ShopPage = () => {
    const dispatch = useDispatch();
    let beerObject = useSelector((state) => state.beer)
    let beerArray = Object.values(beerObject)



    useEffect(() => {
        dispatch(LoadBeers())
    }, [dispatch])


    return (
        <div>
          <div>
                {beerArray?.map((beer) => (
                    <div>
                    <div>{beer?.name}-{beer?.abv}.0%</div>
                    <button>Half Keg 89.99$</button>
                    <button>Full Keg 189.99$</button>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShopPage;
