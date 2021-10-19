import * as React from "react";

import { WatchListContext } from "../context/watchListContext";

import Coin from "./Coin";

const CoinList = () => {
  const { useState, useEffect, useContext } = React;
  //
  const { isLoading, coins } = useContext(WatchListContext);

  if (isLoading) {
    return <div className="text-center fs-4 fw-bold mt-5">Loading...</div>;
  }
  return (
    <div className="coingecko-table">
      <div className="d-block w-100 overflow-hidden">
        <table
          className="table table-striped mb-0 text-4"
          style={{ maxWidth: "750xp", overflowY: "hidden" }}
        >
          <thead>
            <tr>
              <th role="columnheader" colSpan="1" />
              <th className="table-number" colSpan="1" role="columnheader">
                #
              </th>
              <th
                className="cion-name text-start"
                colSpan="1"
                role="columnheader"
              >
                Coin
              </th>
              <th className="price text-end" role="columnheader" colSpan="1">
                Price
              </th>
              <th
                className="col-market change24 text-end"
                role="columnheader"
                style={{ width: "70px" }}
                colSpan="1"
              >
                24h
              </th>
              <th
                className="lit text-end col-market"
                role="columnheader"
                colSpan="1"
              >
                24h Volume
              </th>
              <th
                className="cap text-end col-market"
                role="columnheader"
                colSpan="1"
              >
                Mkt Cap
              </th>
            </tr>
          </thead>
          <tbody className="coinList list-group mt-2">
            {coins.map((coin) => (
              <Coin key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinList;
