import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



// Ensure markers appear correctly in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapComponent = ({ route }) => {
  // Default position (you might want to set this to a central or initial user location)
  const defaultPosition = [-23.5505, -46.6333]; 

  return (
    <MapContainer center={defaultPosition} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {route.map((customer, index) => {
        // Check if customer location exists
        if (customer.location && customer.location.x && customer.location.y) {
          const position = [customer.location.x, customer.location.y];
          return (
            <Marker key={index} position={position}>
              <Popup>
                {customer.nome}<br/>
                {customer.email}<br/>
                {customer.telefone}
              </Popup>
            </Marker>
          );
        }
        return null; // Return null if there's no valid location for a customer
      })}
    </MapContainer>
  );
};

export default MapComponent;
