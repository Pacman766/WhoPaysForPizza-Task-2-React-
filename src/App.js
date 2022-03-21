import React from 'react';
import './app.scss';

import Header from './Header/Header';
import { useState } from 'react';
import MainButton from './MainButton/MainButton';
import TotalTable from './TotalTable/TotalTable';
import Pizza from './Pizza/Pizza';
import SumText from './SumText/SumText';

export default function App() {
  const [error, setError] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [allPeople, setAllPeople] = useState(0);
  const [onceLoaded, setOnceLoaded] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [currencyExchangeRates, setCurrencyExchangeRates] = useState({});
  const [diets, setDiets] = useState([]);

  // < ------- get guests list ------- >
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

  // < ------- encode and get people with there diet ------- >
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

  // < ------- get pizza by slices ------- >
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

  // < ------- get currency ------- >
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

      // filter by those who eat pizza
      const guests = await fetchGuestsAsync();
      setAllPeople(guests.length);
      const pizzaEaters = guests.filter((element) => element.eatsPizza);

      // filter by vegans
      const diets = await fetchDietsAsync(pizzaEaters);
      setDiets(diets.map((diet) => ({ ...diet, hasPaid: false })));
      const vegans = diets.filter((element) => element.isVegan);

      let pizzaType = '';

      // random vegan or meat
      if (vegans.length / pizzaEaters.length >= 0.51) {
        const pizzaWithoutMeat = ['vegan', 'cheese'];
        pizzaType =
          pizzaWithoutMeat[Math.floor(Math.random() * pizzaWithoutMeat.length)];
      } else {
        pizzaType = 'meat';
      }

      // get type, name and price of pizza + currency and check if loaded
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

  // set paid by click
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
      {/* if no error and is loading show "wating" and, when loaded, show table */}
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
          {/* if loading show nothing, when loaded, show sliced pizza*/}
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
          {/* if loading show nothing, when loaded, show all people and pizza-eaters*/}
          {isLoading ? (
            <p> </p>
          ) : (
            onceLoaded && (
              <SumText allPeople={allPeople} pizzaEatersCount={diets.length} />
            )
          )}
        </>
      ) : (
        <p>Something went wrong :(</p>
      )}
    </div>
  );
}
