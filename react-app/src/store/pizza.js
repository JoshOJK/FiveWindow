const LOAD_PIZZA = "LOAD_PIZZA"
const PIZZA_DETAIL = "PIZZA_DETAIL"
const DELETE_PIZZA = "DELETE_PIZZA"
const UPDATE_PIZZA = "UPDATE_PIZZA"
const CREATE_PIZZA = "CREATE_PIZZA"
const CREATE_PIZZA_IMAGE = "CREATE_PIZZA_IMAGE"
const DELETE_PIZZA_IMAGE = "DELETE_PIZZA_IMAGE"

const loadAction = (pizzas) => ({
    type: LOAD_PIZZA,
    pizzas,
  });

const loadDetailsAction = (pizza) => ({
    type: PIZZA_DETAIL,
    pizza,
  });

const updatePizzaAction = (pizza) => ({
    type: UPDATE_PIZZA,
    pizza,
  });

const deletePizzaAction = (pizzaId) => ({
    type: DELETE_PIZZA,
    pizzaId,
  });

const createPizzaAction = (pizzaDetails) => ({
    type: CREATE_PIZZA,
    pizzaDetails,
  });

const createPizzaImageAction = (imageUrl) => ({
    type: CREATE_PIZZA_IMAGE,
    imageUrl
  })

const deletePizzaImageAction = (imageId) => ({
    type: DELETE_PIZZA_IMAGE,
    imageId
})

export const LoadPizzas = () => async (dispatch) => {
    const res = await fetch(`/api/pizza`)

    if(res.ok) {
        const allPizzas = await res.json()
        dispatch(loadAction(allPizzas))
        return res
    }
}

export const loadPizzaDetails = (pizzaId) => async (dispatch) => {
    const res = await fetch(`/api/pizza/${pizzaId}`)

    if(res.ok) {
        const details = await res.json();
        dispatch(loadDetailsAction(details))
        return res;
    }
}

export const createPizza = (pizzaData) => async (dispatch) => {
    const res = await fetch("/api/pizza/create", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pizzaData),
    })

    if(res.ok) {
        const newPizza = await res.json();
        dispatch(createPizzaAction(newPizza))
        return newPizza
    }
}

export const updatePizza = (pizzaId, pizzaData) => async (dispatch) => {
    const res = await fetch(`/api/pizza/${pizzaId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pizzaData),
    })
    const updatedPizza = await res.json();
    dispatch(updatePizzaAction(updatedPizza))
    return res;
}

export const deletePizza = (pizzaId) => async (dispatch) => {
    const res = await fetch(`/api/pizza/${pizzaId}/delete`, {
        method: 'DELETE'
    })
    dispatch(deletePizzaAction(pizzaId))
    return res;
}

export const createPizzaImage = (pizzaImg, pizzaId) => async (dispatch) => {
    const res = await fetch(`/api/pizza/${pizzaId}/image`, {
        method: 'POST',
        body: pizzaImg
    })
    if (res.ok) {
        const result = await res.json();
        console.log(result, 'This is result')
        await dispatch(createPizzaImageAction(result));
    } else {
        console.log("There was an error making your post!")
    }
}

export const deletePizzaImage = (pizzaImageId) => async (dispatch) => {
    const res = await fetch(
      `/api/pizza/${pizzaImageId}/image/delete`,
      {
        method: "DELETE",
      }
    );
    dispatch(deletePizzaImageAction(pizzaImageId));
    return res;
  };


const pizzaReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_PIZZA:
            newState={}
            action.pizzas.forEach((pizza) => {
                newState[pizza.id] = pizza
            })
            return newState
        case PIZZA_DETAIL:
            newState[action.pizza.id] = action.pizza
            return newState
        case DELETE_PIZZA:
            delete newState[action.pizzaId]
            return newState
        default:
            return state
    }
}

export default pizzaReducer;
