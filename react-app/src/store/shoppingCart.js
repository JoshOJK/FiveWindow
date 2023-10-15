
const GET_SHOPPINGCART = "GET_SHOPPINGCART"
const CREATE_CARTITEM = "CREATE_CARTITEM"
const DELETE_CARTITEM = "DELETE_CARTITEM"
const CREATE_SHOPPINGCART = "CREATE_SHOPPINGCART"


const loadCart = (cart) => ({
    type: GET_SHOPPINGCART,
    cart
})

const createCart = (shoppingCart) => ({
    type: CREATE_SHOPPINGCART,
    shoppingCart
})

const createCartItem = (cartItem) => ({
    type: CREATE_CARTITEM,
    payload: cartItem
})

const deleteCartItem = (itemId) => ({
    type: DELETE_CARTITEM,
    itemId
})


export const LoadCart = () => async (dispatch) => {
    const res = await fetch('/api/cart/')
    console.log(res)
    if(res.ok) {
        const personalCart = await res.json()
        dispatch(loadCart(personalCart))
        return res
    }
}


export const createShoppingCart = () => async (dispatch) => {
    const res = await fetch("/api/cart/create", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    })
    console.log('AHAHAHAAAAAAAHAHAHAHAHAAHHAHAHAHAHAHA', res)
    if(res.ok) {
        const shoppingCart = await res.json()
        dispatch(createCart(shoppingCart))
        return res
    }
}


export const newCartItem = (itemId, payload) => async (dispatch) => {

    const res = await fetch(`/api/beer/${itemId}/shopping-cart`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
        console.log(res)
    if(res.ok) {
        const cartItem = await res.json()
        console.log("HELEHLLHEHLEHLEHL", cartItem.beer)
        dispatch(createCartItem(cartItem))
        return cartItem;
    } else {
        const errors = await res.json()
        console.log(errors)
    }

}

export const deleteItem = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/beer/${itemId}/shopping-cart`, {
        method: "DELETE"
    })
    dispatch(deleteCartItem(itemId))
    return res;
}


// const cartReducer = (state = {}, action) => {
//     let newState = {...state}
//     switch (action.type) {
//         case GET_SHOPPINGCART:
//             newState[action.cart.id] = action.cart
//             return newState
//         case CREATE_SHOPPINGCART:
//             newState[action.shoppingCart.id] = action.shoppingCart
//             return newState
//         case CREATE_CARTITEM:
//             let cartItem = action.payload
//             newState[cartItem.id] = cartItem
//             return newState
//         case DELETE_CARTITEM:
//             delete newState[action.itemId]
//             return newState
//         default:
//             return state
//     }
// }

const cartReducer = (state = {personalCart:{
    beerItems: []
}}, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_SHOPPINGCART:
            newState.personalCart = action.cart
            return newState
        case CREATE_SHOPPINGCART:
            newState.personalCart = action.shoppingCart
            return newState
        case CREATE_CARTITEM:
            let cartItem = action.payload
            console.log("STATE", newState)
            newState.personalCart.beeritems = [...newState.personalCart.beeritems, cartItem]
            return newState
        case DELETE_CARTITEM:
            delete newState[action.itemId]
            return newState
        default:
            return state
    }
}


export default cartReducer;
