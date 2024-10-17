import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useFilters } from "../context/FilterContext";

// Register Chart.js components
Chart.register(...registerables);

const GraphComponent = () => {
  const { ageRange, gender, startDate, endDate } = useFilters();
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lineChartData, setLineChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams({
        ageRange,
        gender,
        startDate,
        endDate,
      }).toString();

      try {
        const response = await fetch(
          `http://localhost:5000/api/chart/data?${query}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ageRange, gender, startDate, endDate]);

  // Function to get data for the bar chart
  const getBarChartData = () => {
    const labels = ["A", "B", "C", "D", "E", "F"];
    const totals = labels.map((label) =>
      data.reduce((sum, item) => sum + parseInt(item[label] || 0), 0)
    );

    return {
      labels,
      datasets: [
        {
          label: "Total Time Spent",
          data: totals,
          backgroundColor: "#4472C4", // Bar color
          borderColor: "#4472C4", // Bar border color
          borderWidth: 2, // Border width of the bars
          hoverBackgroundColor: "#C55A11", // Color on hover
        },
      ],
    };
  };

  // Handle click event on bar chart
  const handleBarClick = (elems) => {
    if (elems.length > 0) {
      const index = elems[0].index;
      const selectedLabel = ["A", "B", "C", "D", "E", "F"][index];
      // Calculate line chart data based on the selected category
      calculateLineChartData(selectedLabel);
    }
  };

  // Calculate line chart data from the selected category
  const calculateLineChartData = (category) => {
    const labels = data.map((item) => item.Day);
    const lineData = data.map((item) => parseInt(item[category] || 0));

    setLineChartData({
      labels,
      datasets: [
        {
          label: `Time Trend for ${category}`,
          data: lineData,
          fill: false,
          borderColor: "rgba(153, 102, 255, 1)",
          tension: 0.1,
        },
      ],
    });
    setSelectedCategory(category);
  };

  return (
    <div className="p-6 mt-5 md:p-8 lg:p-10">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6 tracking-wide lg:text-3xl">
            Bar Chart: <span className="text-blue-600">Total Time Spent</span>
          </h2>

          <Bar
            className="cursor-pointer"
            data={getBarChartData()}
            options={{
              indexAxis: "y", // Makes the bar chart horizontal
              onClick: (event, elems) => handleBarClick(elems),
              plugins: {
                zoom: {
                  pan: {
                    enabled: true,
                    mode: "x",
                  },
                  zoom: {
                    enabled: true,
                    mode: "x",
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true, // Ensure the bars start from 0
                  grid: {
                    display: true, // Show vertical grid lines
                  },
                  border: {
                    display: false, // Remove outer border for x-axis
                  },
                },
                y: {
                  grid: {
                    display: false, // Remove horizontal grid lines
                  },
                  border: {
                    display: false, // Remove outer border for y-axis
                  },
                },
              },
            }}
          />
        </div>

        {lineChartData.labels && selectedCategory && (
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl text-center font-extrabold text-gray-800 mb-6 tracking-wide lg:text-3xl">
              Line Chart:{" "}
              <span className="text-green-600">
                Time Trend for {selectedCategory}
              </span>
            </h2>

            <Line
              data={lineChartData}
              options={{
                responsive: true,
                plugins: {
                  zoom: {
                    pan: {
                      enabled: true,
                      mode: "x",
                    },
                    zoom: {
                      enabled: true,
                      mode: "x",
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false, // Remove vertical grid lines
                    },
                    border: {
                      display: false, // Remove outer border for x-axis
                    },
                  },
                  y: {
                    grid: {
                      display: true, // Keep horizontal grid lines (optional)
                    },
                    border: {
                      display: false, // Remove outer border for y-axis
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphComponent;
