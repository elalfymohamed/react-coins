import { Link } from "react-router-dom";

import { BsStarFill } from "react-icons/bs";

const Header = () => {
  return (
    <div className="container mb-5">
      <h1 className="text-center font-weight mt-4 mb-4">Coin</h1>
      <div className="text-center">
        <ul className="d-flex align-items-center justify-content-evenly flex-row">
          <li className="fs-6">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">
              <div className="d-flex fs-6 ">
                <span>Portfolio</span>
                <span className="star-fill">
                  <BsStarFill />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
