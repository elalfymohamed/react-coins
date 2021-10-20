import React, { createContext, useState, useEffect } from "react";
import coinGecko from "../api/coinGecko";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  // state hook
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPortfolio, setIsPortfolio] = useState([]);
  const [showMessageAdd, setShowMessageAdd] = useState({
    show: false,
    coinName: "",
  });
  const [showMessageRemove, setShowMessageRemove] = useState({
    show: false,
    coinName: "",
  });

  // add item to portfolio array
  const addToPortfolio = (coinsId) => {
    // check if coin is already in portfolio
    const item = coins.find((prod) => prod.id === coinsId.id);
    const isPort = isPortfolio.find((prod) =>
      prod.id === coinsId.id ? true : false
    );
    // if not in portfolio, add to portfolio
    setIsPortfolio(
      isPort ? isPortfolio : [...isPortfolio, { ...item, favorite: true }]
    );
    setShowMessageAdd({
      show: true,
      coinName: item.name,
    });
  };

  // remove item from portfolio array
  const removeFromPortfolio = (coinsId) => {
    const removeFP = isPortfolio.filter((prod) => prod.id !== coinsId.id);
    setIsPortfolio(removeFP);
    setShowMessageRemove({
      show: true,
      coinName: coinsId.name,
    });
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
  }, []);

  // useEffect hook to show message
  useEffect(() => {
    // if check is showMessageAdd is true, set showMessageAdd to false after 2 seconds
    if (showMessageAdd.show) {
      setTimeout(() => {
        setShowMessageAdd({
          show: false,
          coinName: "",
        });
      }, 2000);
    }
    // if check is showMessageRemove is true, set showMessageRemove to false after 2 seconds
    if (showMessageRemove.show) {
      setTimeout(() => {
        setShowMessageRemove({
          show: false,
          coinName: "",
        });
      }, 2000);
    }
  }, [showMessageAdd.show, showMessageRemove.show]);

  return (
    <WatchListContext.Provider
      value={{
        isLoading,
        coins,
        numberWithCommas,
        addToPortfolio,
        isPortfolio,
        removeFromPortfolio,
        showMessageAdd,
        showMessageRemove,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
