
const CREATE_CARTITEM = "CREATE_CARTITEM"
const DELETE_CARTITEM = "DELETE_CARTITEM"
const CREATE_SHOPPINGCART = "CREATE_SHOPPINGCART"



const createCart = (shoppingCart) => ({
    type: CREATE_SHOPPINGCART,
    shoppingCart
})

const createCartItem = (item) => ({
    type: CREATE_CARTITEM,
    item
})

const deleteCartItem = (itemId) => ({
    type: DELETE_CARTITEM,
    itemId
})


export const createShoppingCart = () => async (dispatch) => {
    const res = await fetch("/api/cart", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    })

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

    if(res.ok) {
        const cartItem = await res.json()
        dispatch(createCartItem(cartItem))
        return res
    }
}

export const deleteItem = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/beer/${itemId}/shopping-cart`, {
        method: "DELETE"
    })
    dispatch(deleteCartItem(itemId))
    return res;
}


const cartReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case CREATE_SHOPPINGCART:
            newState[action.shoppingCart.id] = action.shoppingCart
            return newState
        case CREATE_CARTITEM:
            newState[action.cartItem.id] = action.cartItem
            return newState
        case DELETE_CARTITEM:
            delete newState[action.itemId]
            return newState
        default:
            return state
    }
}


export default cartReducer;
