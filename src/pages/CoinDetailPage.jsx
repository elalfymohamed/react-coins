import * as React from "react";

import { useParams } from "react-router-dom";

// components
import HistoryChart from "../components/HistoryChart";
import CoinData from "../components/CoinData";
import coinGecko from "../api/coinGecko";

const CoinDetailPage = () => {
  // react hooks
  const { useEffect, useState } = React;
  // react router hooks
  let { id } = useParams();
  // state Hooks
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // formating the data for the chart
  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0],
        y: el[1].toFixed(2),
      };
    });
  };
  // Effect Hooks
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "360",
          },
        }),
        coinGecko.get(`/coins/markets/`, {
          params: {
            vs_currency: "usd",
            id: id,
          },
        }),
      ]);
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const renderData = () => {
    return (
      <div className="coinList">
        <HistoryChart data={coinData} />
        <CoinData data={coinData.data} />
      </div>
    );
  };
  return renderData();
};

export default CoinDetailPage;
