import * as React from "react";

import { WatchListContext } from "../context/watchListContext";

import Coin from "./Coin";

const CoinList = () => {
  const { useState, useEffect, useContext } = React;
  //
  const { isLoading, coins } = useContext(WatchListContext);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="coingecko-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th role="columnheader" />
            <th className="table-number" role="columnheader">
              #
            </th>
            <th className="cion-name text-start" role="columnheader">
              Coin
            </th>
            <th class="price text-end" role="columnheader">
              Price
            </th>
            <th class="lit text-end col-market" role="columnheader">
              24h Volume
            </th>
            <th class="cap text-end col-market" role="columnheader">
              Mkt Cap
            </th>
          </tr>
        </thead>
        <tbody className="coinlist list-group mt-2">
          {coins.map((coin) => (
            <Coin key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
