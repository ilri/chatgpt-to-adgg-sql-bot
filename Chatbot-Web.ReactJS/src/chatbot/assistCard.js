import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import mdiFarmHome from "../assest/images/mdi_farm-home.png";
import MapCard from "./mapCard";
import BarChart from "./barChart";

function AssistCard({ data, isTyping }) {
  const renderMapOrChartBasedOnData = (item) => {
    if (
      item.role !== "assistant" ||
      !(
        item.content.trim().startsWith("[") && item.content.trim().endsWith("]")
      )
    ) {
      return null;
    }

    try {
      const farmData = JSON.parse(item.content);

      if (!Array.isArray(farmData) || farmData.length === 0) {
        return null;
      }

      const mapData = farmData
        .filter((farm) => farm.latitude && farm.longitude)
        .map((farm) => ({
          farmName: farm[Object.keys(farm)[0]],
          position: [farm.latitude, farm.longitude],
        }));
      if (mapData.length === 1) {
        return (
          <div className="map-card">
            <MapCard mapData={mapData[0]} />
          </div>
        );
      } else if (farmData.length >= 2) {
        const categories = farmData.map((farm) => farm[Object.keys(farm)[0]]);
        const seriesData = farmData
          .filter((farm) => farm.total)
          .map((farm) => farm.total);

        if (categories.length > 2 && seriesData.length > 2) {
          return <BarChart categories={categories} seriesData={seriesData} />;
        }
      }
    } catch (error) {
      console.error("Error parsing data:", error);
      return null;
    }

    return null;
  };

  const [showQueries, setShowQueries] = useState([]);

  useEffect(() => {
    if (data) {
      const initialStates = data.map(() => false);
      setShowQueries(initialStates);
    }
  }, [data]);

  const handleShowQuery = (index) => {
    setShowQueries((prevShowQueries) => {
      const updatedShowQueries = [...prevShowQueries];
      updatedShowQueries[index] = !prevShowQueries[index];
      return updatedShowQueries;
    });
  };

  const formatKeyName = (key) => {
    // Split the key string by underscores and capitalize each word
    const words = key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words with a space to create the formatted string
    const formattedKey = words.join(" ");

    return formattedKey;
  };
  return (
    <section className="data-card">
      {data && data.length
        ? data.map((chat, index) =>
            chat.role === "user" ? (
              <h1 className="user-question">{chat.content}</h1>
            ) : (
              <div className="content-card">
                <div className="details-grid-card">
                  {chat.content.trim().startsWith("[") &&
                  chat.content.trim().endsWith("]") ? (
                    JSON.parse(chat.content).length > 0 &&
                    JSON.parse(chat.content).map((item, index) => (
                      <div className="details-card">
                        <div className="farm-icon">
                          <img src={mdiFarmHome} alt="farm home icon" />
                        </div>
                        <div>
                          <p key={index} className="details-text">
                            <span>
                              <div key={index} className="text-left">
                                {Object.entries(item).map(
                                  ([key, value]) =>
                                    typeof value !== "object" &&
                                    value !== null &&
                                    !Array.isArray(value) && (
                                      <div key={key}>
                                        <strong>{formatKeyName(key)}:</strong>{" "}
                                        {value}
                                      </div>
                                    )
                                )}
                              </div>
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div className="details-card">
                        <p className="details-text">{chat.content}</p>
                      </div>
                    </div>
                  )}
                </div>

                {renderMapOrChartBasedOnData(chat)}
                {chat?.queryDetails && (
                  <div>
                    <p
                      onClick={() => handleShowQuery(index)}
                      className="show-query-text"
                    >
                      {!showQueries[index]
                        ? "Show SQL Query"
                        : "Close SQL Query"}
                    </p>
                  </div>
                )}

                {chat?.queryDetails && showQueries[index] && (
                  <div className="details-card">
                    <p className="details-text">{chat.queryDetails}</p>
                  </div>
                )}
              </div>
            )
          )
        : ""}
      {isTyping && (
        <ColorRing
          visible={true}
          height="60"
          width="60"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["white", "white", "white", "white", "white"]}
        />
      )}
    </section>
  );
}

export default AssistCard;
