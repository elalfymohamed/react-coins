import { Link } from "react-router-dom";

const Coin = ({ coin }) => {
  console.log(coin);
  return (
    <tr className="coinlist-item list-group-item list-group-item-action d-flex justify-content align-items-center text-dark ">
      <tb className="ps-1 pr-0" style={{ width: "1px" }}>
        *
      </tb>
      <tb className="text-center text-xs" style={{ maxWidth: "28px" }}>
        {coin.market_cap_rank}
      </tb>
      <tb className="py-0">
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
              <span className="ps-2" style={{ width: "110px" }}>
                {coin.name}
              </span>
              <span
                className="ps-2"
                style={{ fontSize: ".7rem", fontWeight: 400, color: "#000" }}
              >
                {coin.symbol}
              </span>
            </div>
          </div>
        </Link>
      </tb>
      <tb>
        <span className="ps-2" style={{ width: "110px" }}>
          $ {coin.current_price}
        </span>
      </tb>
    </tr>
  );
};

export default Coin;
