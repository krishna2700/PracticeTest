import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ customAmount, regularAmounts }) => {
  const data = {
    labels: [
      "Category 6",
      "Category 7",
      "Category 8",
      "Category 9",
      "Category 10",
    ],
    datasets: [
      {
        label: "Song Request Amounts",
        backgroundColor: "#F0C3F1",
        borderColor: "#F0C3F1",
        borderWidth: 1,
        hoverBackgroundColor: "#F0C3F1",
        hoverBorderColor: "#F0C3F1",
        data: [
          customAmount,
          regularAmounts.category_7,
          regularAmounts.category_8,
          regularAmounts.category_9,
          regularAmounts.category_10,
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
