import React from 'react';
import './app.scss';

import Header from './Header/Header';
import { useState } from 'react';
import MainButton from './MainButton/MainButton';
import TotalTable from './TotalTable/TotalTable';
import Pizza from './Pizza/Pizza'; 
import SumText from "./SumText/SumText";

export default function App() {
  const [error, setError] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [allPeople, setAllPeople] = useState(0);
  const [onceLoaded, setOnceLoaded] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [currencyExchangeRates, setCurrencyExchangeRates] = useState({});
  const [diets, setDiets] = useState([]);

  const fetchGuestsAsync = async () => {
    try {
      const response = await fetch(
        'https://gp-js-test.herokuapp.com/pizza/guests'
      );
      const data = await response.json();
      return data.party;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const fetchDietsAsync = async (people) => {
    const peopleNamesEncoded = people.map(({ name }) =>
      encodeURIComponent(name)
    );
    try {
      const response = await fetch(
        `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${peopleNamesEncoded.join()}`
      );
      const data = await response.json();
      return data.diet;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const fetchPizzaOrderAsync = async (pizzaType, sliceCount) => {
    try {
      const response = await fetch(
        `https://gp-js-test.herokuapp.com/pizza/order/${pizzaType}/${sliceCount}`
      );
      return await response.json();
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const fetchCurrencyExchangeRateAsync = async () => {
    try {
      const response = await fetch(
        'https://gp-js-test.herokuapp.com/pizza/currency'
      );
      return await response.json();
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const handleClick = async () => {
    try {
      setisLoading(true);

      const guests = await fetchGuestsAsync();
      setAllPeople(guests.length);
      const pizzaEaters = guests.filter((element) => element.eatsPizza);

      const diets = await fetchDietsAsync(pizzaEaters);
      setDiets(diets.map((diet) => ({ ...diet, hasPaid: false })));
      const vegans = diets.filter((element) => element.isVegan);

      let pizzaType = '';

      if (vegans.length / pizzaEaters.length >= 0.51) {
        const pizzaWithoutMeat = ['vagan', 'sheese'];
        pizzaType =
          pizzaWithoutMeat[Math.floor(Math.random() * pizzaWithoutMeat.length)];
      } else {
        pizzaType = 'meat';
      }

      const [orderDetails, currencyExchangeRates] = await Promise.all([
        fetchPizzaOrderAsync(pizzaType, pizzaEaters.length),
        fetchCurrencyExchangeRateAsync(),
      ]);
      setOrderDetails(orderDetails);
      setCurrencyExchangeRates(currencyExchangeRates);
      if (!onceLoaded) {
        setOnceLoaded(true);
      }
    } catch (error) {
      setError(error);
    } finally {
      setisLoading(false);
    }
  };

  const handlePayClick = (name) => {
    setDiets((diets) => {
      const dietsCopy = [...diets];
      const index = dietsCopy.findIndex((d) => d.name === name);
      dietsCopy[index].hasPaid = true;
      return dietsCopy;
    });
  };

  return (
    <div>
      <Header />
      <MainButton onClick={handleClick} isLoading={isLoading} />
      {!error ? (
        <>
          {isLoading ? (
            <p> Waiting... </p>
          ) : (
            onceLoaded && (
              <TotalTable
                pizzaEaters={diets}
                orderDetails={orderDetails}
                currencyExchangeRates={currencyExchangeRates}
                onPayClick={handlePayClick}
                diets={diets}
              />
            )
          )}
          {isLoading ? (
            <p> </p>
          ) : (
            onceLoaded && (
              <Pizza
                pizzaEatersCount={diets.length}
                orderDetails={orderDetails}
              />
            )
          )}
          {isLoading ? (
            <p> </p>
          ) : (
            onceLoaded && (
              <SumText
                allPeople={allPeople}
                pizzaEatersCount={diets.length}
              />
            )
          )}
        </>
      ) : (
        <p>Something went wrong :(</p>
      )}
    </div>
  );
}
