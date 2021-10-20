import * as React from "react";
// react-router-dom
import { Link } from "react-router-dom";
// components
import { WatchListContext } from "../context/watchListContext";
import Message from "../contents/Message";
// react icons
import { TiStarHalf } from "react-icons/ti";

const PortfolioPage = () => {
  // React Hooks
  const { useContext } = React;
  // Context Hooks
  const { isPortfolio, numberWithCommas, removeFromPortfolio } =
    useContext(WatchListContext);

  if (Object.keys(isPortfolio).length === 0) {
    return (
      <div className="portfolio-page text-center">
        <h1>No items in portfolio</h1>
      </div>
    );
  }

  return (
    <>
      <Message />

      <div className="container">
        <div className="text-center mb-5">
          <h3 className="fw-bold fs-3">Portfolio</h3>
        </div>
        <div className="row">
          {isPortfolio.map((item) => (
            <div className="col-lg-2 col-md-4 col-sm-4" key={item.id}>
              <div className="card mb-4 p-1">
                <div className="remove--port">
                  <button
                    className="btn--remove"
                    onClick={() => removeFromPortfolio(item)}
                  >
                    <TiStarHalf />
                  </button>
                </div>
                <div className="text-center pt-2">
                  <img
                    className="card-img-top "
                    style={{ width: "40px" }}
                    src={item.image}
                    alt={item.symbol}
                  />
                  <Link to={`/details/${item.id}`}>
                    <p className="card-text fs-6 mt-2">{item.name}</p>
                  </Link>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <div className="cart-text">
                      <span
                        className={
                          item.market_cap_change_percentage_24h > 0
                            ? "text-green"
                            : "text-red"
                        }
                        data-24h="true"
                        style={
                          item.market_cap_change_percentage_24h > 0
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {item.market_cap_change_percentage_24h.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-2 cart-text">
                      <span className="fw-bold">
                        ${numberWithCommas(item.current_price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
