import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Offer } from '../mocks/offers';

type MapProps = {
  offers: Offer[];
  className?: string;
};

export const Map: React.FC<MapProps> = ({ offers, className = '' }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<leaflet.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletMapRef.current) {
      leafletMapRef.current = leaflet.map(mapRef.current, {
        center: [52.37454, 4.897976],
        zoom: 12,
        scrollWheelZoom: true,
      });

      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMapRef.current);
    }

    leafletMapRef.current.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker) {
        leafletMapRef.current?.removeLayer(layer);
      }
    });

    offers.forEach((offer) => {
      leaflet.marker([offer.location.latitude, offer.location.longitude]).addTo(leafletMapRef.current!);
    });

    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, [offers]);

  return (
    <section
      ref={mapRef}
      className={`map ${className}`}
      style={{ height: '100%', width: '100%' }}
      id="cities__leaflet-map-wrapper"
    />
  );
};
