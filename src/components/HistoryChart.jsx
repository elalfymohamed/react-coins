import * as React from "react";

import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";

import { historyOptions } from "../chartConfigs/ChartConfigs";

const HistoryChart = ({ data }) => {
  // TODO: Implement HistoryChart
  // react Hooks
  const { useRef, useEffect, useState } = React;
  // useState Hooks
  const [timeFormat, setTimeFormat] = useState("24h");
  const [isRebuildingCanvas, setIsRebuildingCanvas] = useState(false);

  // useRef Hooks
  const chartRef = useRef(null);
  // get data from props
  const { day, week, year, detail } = data;
  // const  name  = detail.name;

  // determine the time format to display on the chart (24h or 7d or 1y)
  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };
  // remove the canvas whenever timeFormat changes
  useEffect(() => {
    setIsRebuildingCanvas(true);
  }, [timeFormat]);
  // if isRebuildingCanvas was true for the latest render, rebuild the canvas
  useEffect(() => {
    if (isRebuildingCanvas) {
      setIsRebuildingCanvas(false);
    }
  }, [isRebuildingCanvas]);
  // useEffect Hooks
  useEffect(() => {
    if (!detail || !chartRef.current || isRebuildingCanvas) {
      return;
    }
    const chartInStance = new Chart(chartRef.current, {
      type: "line",
      data: {
        datasets: [
          {
            label: `${detail.name} price`,
            data: determineTimeFormat(),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            // pointRadius: 0,
            borderWidth: 1,
          },
        ],
      },
      options: {
        ...historyOptions,
      },
    });
    return () => {
      chartInStance.destroy();
    };
  }, [detail, determineTimeFormat, isRebuildingCanvas]);
  //
  const renderPrice = () => {
    if (detail) {
      return (
        <div className="price d-flex flex-row justify-content-evenly align-items-center">
          <p className="my-0">{detail.current_price.toFixed(2)}</p>
          <p
            className={
              detail.price_change_percentage_24h > 0
                ? "text-success my-0"
                : "text-danger my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      );
    }
  };
  return (
    <div className="m-auto" style={{ maxWidth: "900px", height: "900px" }}>
      <div>{renderPrice()}</div>
      <div>
        {isRebuildingCanvas ? undefined : (
          <canvas ref={chartRef} id="myChart" width="300" height="200" />
        )}
      </div>
      <div className="chart-button mt-3 text-center">
        <button
          type="button"
          className="btn btn-outline-dark btn-m"
          onClick={() => setTimeFormat("24h")}
        >
          24H
        </button>
        <button
          type="button"
          className="btn btn-outline-dark btn-m mx-4"
          onClick={() => setTimeFormat("7d")}
        >
          1D
        </button>
        <button
          type="button"
          className="btn btn-outline-dark btn-m"
          onClick={() => setTimeFormat("1y")}
        >
          1Y
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;
