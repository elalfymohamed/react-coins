import React, { createContext, useState, useEffect } from "react";
import coinGecko from "../api/coinGecko";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  // state hook
  const [watchList, setWatchList] = useState([]);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPortfolio, setIsPortfolio] = useState([]);

  // add item to portfolio array
  const addToPortfolio = (coinsId) => {
    // check if coin is already in portfolio
    const item = coins.find((prod) => prod.id === coinsId.id);
    const isPort = isPortfolio.find((prod) =>
      prod.id === coinsId.id ? true : false
    );
    // if not in portfolio, add to portfolio
    setIsPortfolio(
      isPort
        ? isPortfolio
        : [...isPortfolio, { ...item, coinsId: 1, favorite: true }]
    );
  };

  // remove item from portfolio array
  const removeFromPortfolio = (coinsId) => {
    return {
      isPortfolio: isPortfolio.filter((prod) => prod.id !== coinsId.id),
    };
    // console.log("isPortfolio");
  };
  console.log(isPortfolio);
  //  get Watch List
  const getWatchList = () => {
    coins.map((coin) => setWatchList(coin.name));
  };

  // Number With Commas Function
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Effect hook
  useEffect(() => {
    // get coins from coinGecko API
    const fetchData = async () => {
      setIsLoading(true);
      const data = await coinGecko.get("coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
        },
      });
      setCoins(data.data);
      setIsLoading(false);
    };
    fetchData();
    getWatchList();
  }, []);

  return (
    <WatchListContext.Provider
      value={{
        isLoading,
        coins,
        watchList,
        numberWithCommas,
        addToPortfolio,
        isPortfolio,
        removeFromPortfolio,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
