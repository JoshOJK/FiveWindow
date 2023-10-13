import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { LoadBeers } from "../../store/beer";
import OpenModalButton from "../OpenModalButton";
import DeleteBeerForm from "../deleteBeer";
import "./beerPage.css"

const BeerPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let beerObject = useSelector((state) => state.beer)
    let currentUser = useSelector((state) => state.session.user)
    let beerArray = Object.values(beerObject)





    const checkBeerTap = () => {
        if(beerArray.length >= 15) {
            alert('Maximum beer taps of 15 has been reached')
        } else {
            history.push('/beer/create')
        }
    }


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
                <button onClick={checkBeerTap}>
                    create a beer tap
                </button>
            )}
            </div>

        </div>
    )

}

export default BeerPage
