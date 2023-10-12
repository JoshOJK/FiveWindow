import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { LoadBeers } from "../../store/beer";
import OpenModalButton from "../OpenModalButton";
import DeleteBeerForm from "../deleteBeer";
import "./beerPage.css"

const BeerPage = () => {
    const dispatch = useDispatch();
    let beerObject = useSelector((state) => state.beer)
    let currentUser = useSelector((state) => state.session.user)
    let beerArray = Object.values(beerObject)



    useEffect(() => {
        dispatch(LoadBeers())
    }, [dispatch])


    return (
        <div id="beer-wrapper">
          <div>
                {beerArray?.map((beer) => (
                <div>
                    <div>{beer?.name}-{beer?.abv}.0%</div>
                        <div>{beer?.description}</div>
                        <div>
                    {currentUser?.isAdmin && (
                        <>
                        <NavLink to={`/beer/${beer?.id}/edit`}>Edit Tap</NavLink>
                        <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteBeerForm beerId={beer?.id}/>}
                        />
                        </>
                    )}
                    </div>
                </div>
                ))}
            </div>

            <div>
                {currentUser?.isAdmin && (
                <NavLink to='/beer/create'>
                Create a Beer
                </NavLink>
            )}
            </div>

        </div>
    )

}

export default BeerPage
