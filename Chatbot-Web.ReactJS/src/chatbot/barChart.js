import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ categories, seriesData }) => {
  const [options] = useState({
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#363636",
          fontFamily: "Archivo",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0em",
          textAlign: "center",
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true, // Display the Y-axis line
        color: "#5088C6", // Set the line color
      },
      labels: {
        style: {
          colors: "#5088C6",
          fontFamily: "Archivo",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "13px",
          letterSpacing: "0em",
          textAlign: "center",
        },
      },
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  const [series] = useState([
    {
      name: "series-1",
      data: seriesData,
      color: "#5088C6",
    },
  ]);

  return (
    <div className="chart-card">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="500"
        className="custom-tooltip"
      />
    </div>
  );
};

export default BarChart;
