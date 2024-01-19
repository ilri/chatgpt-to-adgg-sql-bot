import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapCard({ mapData }) {
  const position = mapData?.position;
  return (
    <MapContainer
      center={position}
      zoom={5}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup autoOpen={true}>{mapData?.farmName}</Popup>
      </Marker>
    </MapContainer>
  );
}
