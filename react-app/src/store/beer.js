const LOAD_BEER = "LOAD_BEER"
const BEER_DETAIL = "BEER_DETAIL"
const DELETE_BEER = "DELETE_BEER"
const UPDATE_BEER = "UPDATE_BEER"
const CREATE_BEER = "CREATE_BEER"

const loadAction = (beers) => ({
    type: LOAD_BEER,
    beers,
  });

  const loadDetailsAction = (beer) => ({
    type: BEER_DETAIL,
    beer,
  });

  const updateBeerAction = (beer) => ({
    type: UPDATE_BEER,
    beer,
  });

  const deleteBeerAction = (beerId) => ({
    type: DELETE_BEER,
    beerId,
  });

  const createBeerAction = (beerDetails) => ({
    type: CREATE_BEER,
    beerDetails,
  });

export const LoadBeers = () => async (dispatch) => {
    const res = await fetch(`/api/beer`)

    if(res.ok) {
        const allBeers = await res.json()
        dispatch(loadAction(allBeers))
        return res
    }
}

export const loadBeerDetails = (beerId) => async (dispatch) => {
    const res = await fetch(`/api/beer/${beerId}`)

    if(res.ok) {
        const details = await res.json();
        dispatch(loadDetailsAction(details))
        return res;
    }
}

export const createBeer = (beerData) => async (dispatch) => {
    const res = await fetch("/api/beer/create", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(beerData),
    })

    if(res.ok) {
        const newBeer = await res.json();
        dispatch(createBeerAction(newBeer))
        return newBeer
    }
}

export const updateBeer = (beerId, beerData) => async (dispatch) => {
    const res = await fetch(`/api/beer/${beerId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(beerData),
    })
    const updatedBeer = await res.json();
    dispatch(updateBeerAction(updatedBeer))
    return res;
}

export const deleteBeer = (beerId) => async (dispatch) => {
    const res = await fetch(`/api/beer/${beerId}/delete`, {
        method: 'DELETE'
    })
    dispatch(deleteBeerAction(beerId))
    return res;
}


const beerReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_BEER:
            newState={}
            action.beers.forEach((beer) => {
                newState[beer.id] = beer
            })
            return newState
        case BEER_DETAIL:
            newState[action.beer.id] = action.beer
            return newState
        case DELETE_BEER:
            delete newState[action.beer]
            return newState
        default:
            return state
    }
}

export default beerReducer;
