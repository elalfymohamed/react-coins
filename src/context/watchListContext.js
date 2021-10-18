import React, { createContext, useState, useEffect } from "react";
import coinGecko from "../api/coinGecko";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  // state hook
  const [watchList, setWatchList] = useState([]);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  get Watch List
  const getWatchList = () => {
    coins.map((coin) => setWatchList(coin.name));
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
    <WatchListContext.Provider value={{ isLoading, coins, watchList }}>
      {children}
    </WatchListContext.Provider>
  );
};
