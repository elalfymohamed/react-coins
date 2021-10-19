import * as React from "react";

import { BsStar, BsStarFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import { WatchListContext } from "../context/watchListContext";

const Coin = ({ coin }) => {
  // react Hooks
  const { useContext, useEffect, useState } = React;
  // context Hooks
  const { numberWithCommas, addToPortfolio, isPortfolio, removeFromPortfolio } =
    useContext(WatchListContext);

  // state Hooks
  const [isAdded, setIsAdded] = useState();
  // useEffect Hooks
  useEffect(() => {
    const isInPortfolio = () => {
      const isIn = isPortfolio.find((prod) =>
        prod.id === coin.id ? true : false
      );
      return setIsAdded(isIn ? true : false);
    };
    isInPortfolio();
  }, [coin.id, isPortfolio]);

  return (
    <tr className="coinList-item list-group-item list-group-item-action text-dark ">
      <td className="pl-1 pr-0 " style={{ width: "32px" }}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            isAdded ? removeFromPortfolio(coin) : addToPortfolio(coin);
          }}
        >
          <span className={isAdded ? `star-fill` : `star`}>
            {isAdded ? <BsStarFill /> : <BsStar />}
          </span>
        </div>
      </td>
      <td className="text-center text-xs" style={{ width: "40px" }}>
        {coin.market_cap_rank}
      </td>
      <td className="py-0 " style={{ minWidth: "100px" }}>
        <Link to={`/coin/${coin.id}`}>
          <div className="d-flex flex-row me-4 ">
            <div>
              <img
                src={coin.image}
                alt={coin.name}
                className="coinList-image"
              />
            </div>
            <div className="center">
              <span
                className="ps-2 fw-bold"
                style={{ width: "110px", color: "#000", fontSize: ".8rem" }}
              >
                {coin.name}
              </span>
              <span
                className="ps-2"
                style={{
                  fontSize: ".75rem",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                {coin.symbol}
              </span>
            </div>
          </div>
        </Link>
      </td>
      <td className="py-2 td-price price text-end" style={{ width: "110px" }}>
        <span className="">${numberWithCommas(coin.current_price)}</span>
      </td>
      <td
        className="td-change24 change24 text-end col-market"
        style={{ width: "70px" }}
      >
        <span
          className={coin.change_percentage_24h > 0 ? "text-green" : "text-red"}
          data-24h="true"
          style={
            coin.market_cap_change_percentage_24h > 0
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {coin.market_cap_change_percentage_24h.toFixed(1)}%
        </span>
      </td>
      <td
        className="td-liquidity_score lit text-end col-market"
        style={{ width: "155px" }}
      >
        <span
          className="no-wrap"
          data-no-decimal="true"
          data-price-previous={`${coin.total_volume}`}
        >
          ${numberWithCommas(coin.total_volume)}
        </span>
      </td>
      <td
        className="td-market_cap cap col-market text-end"
        style={{ width: "155px" }}
      >
        <span
          className="no-wrap"
          data-target="price.price"
          data-price-previous={`${coin.market_cap}`}
        >
          ${numberWithCommas(coin.market_cap)}
        </span>
      </td>
    </tr>
  );
};

export default Coin;
