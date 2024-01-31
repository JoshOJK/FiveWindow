import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import PizzaPage from "./components/PizzaPage";
import BeerPage from "./components/BeerPage";
import ShopPage from "./components/ShopPage";
import NewPizza from "./components/createPizza";
import NewBeer from "./components/createBeer";
import UpdateForm from "./components/editPizza";
import UpdateBeerForm from "./components/editBeer";
import ReviewsPage from "./components/reviewsPage"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/pizza/:pizzaId/edit'>
            <UpdateForm />
          </Route>
          <Route path='/beer/:beerId/edit'>
            <UpdateBeerForm />
          </Route>
          <Route path='/pizza/create'>
            <NewPizza />
          </Route>
          <Route path='/beer/create'>
            <NewBeer />
          </Route>
          <Route path='/reviews'>
            <ReviewsPage />
          </Route>
          <Route path='/beer'>
            <BeerPage />
          </Route>
          <Route path='/pizza'>
            <PizzaPage />
          </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
