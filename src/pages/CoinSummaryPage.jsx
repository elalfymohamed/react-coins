import * as React from "react";

// components
import CoinList from "../components/CoinList";
import Message from "../contents/Message";

const CoinSummaryPage = () => {
  return (
    <>
      <Message />
      <section className="container">
        <CoinList />
      </section>
    </>
  );
};

export default CoinSummaryPage;
