export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: false,
    lineHeight: 1.5,
  },
  animation: {
    duration: 2000,
  },
  maintainAspectRatio: true,
  responsive: true,
  scales: {
    xAxes: [
      {
        type: "time",
        distribution: "linear",
      },
    ],
  },
};
