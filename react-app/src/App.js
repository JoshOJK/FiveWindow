import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import PizzaPage from "./components/PizzaPage";
import BeerPage from "./components/BeerPage";
import ShopPage from "./components/ShopPage";
import NewPizza from "./components/createPizza";
import NewBeer from "./components/createBeer";

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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/pizza/create'>
            <NewPizza />
          </Route>
          <Route path='/beer/create'>
            <NewBeer />
          </Route>
          <Route path='/shop'>
            <ShopPage />
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
