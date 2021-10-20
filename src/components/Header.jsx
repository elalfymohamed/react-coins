import { Link, useLocation } from "react-router-dom";

import { BsStarFill } from "react-icons/bs";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPortfolio = location.pathname === "/portfolioPage";

  return (
    <header className="container mb-5">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div>
          <h1 className="text-center font-weight mt-4 mb-4">COIN</h1>
        </div>
        <div className="w-70">
          <div style={{ maxWidth: "700px", width: "700px" }}>
            <ul className="d-flex align-items-center justify-content-evenly flex-row">
              <li className={isHome ? `fs-6 fw-bold` : `d-flex fs-6`}>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/portfolioPage">
                  <div
                    className={
                      isPortfolio ? `d-flex fs-6 fw-bold` : `d-flex fs-6`
                    }
                  >
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
      </div>
    </header>
  );
};

export default Header;
