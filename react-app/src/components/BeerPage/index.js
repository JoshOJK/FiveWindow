import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadBeers } from "../../store/beer";

const BeerPage = () => {
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
                    <div>{beer?.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default BeerPage
