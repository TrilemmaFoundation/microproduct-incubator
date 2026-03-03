import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import L from "leaflet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import { useCapstonesData } from "../../../../../hooks/useCapstonesData";

import { useCommunityData } from "../../../../../hooks/useCommunityData";

import "leaflet/dist/leaflet.css";

import MarkerClusterGroup from "./MarkerClusterGroup";

import "./map-cluster.css";

// Constants

const GEO_JSON_URL =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

// Country mapping

const countryNameToCode: Record<string, string> = {
  "United States": "USA",
  Canada: "CAN",
  "United Kingdom": "GBR",
  Australia: "AUS",
  India: "IND",
  Switzerland: "CHE",
  Japan: "JPN",
  Singapore: "SGP",
  China: "CHN",
  "South Korea": "KOR",
};

type DatasetType = "capstones" | "community";

// Marker icon configuration

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export interface University {
  university: string;
  latitude: number;
  longitude: number;
  country: string;
}

interface TooltipPosition {
  x: number;
  y: number;
}

// Component to capture map instance and handle map clicks

const MapController: React.FC<{
  setMapInstance: (map: L.Map) => void;
}> = ({ setMapInstance }) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (map) {
      setMapInstance(map);
    }
  }, [map, setMapInstance]);

  return null;
};

const LandingMap: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(
    null,
  );
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [activeDataset, setActiveDataset] = useState<DatasetType>("community");
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerCenterOffset = useMemo(() => {
    const iconSizePoint = L.point(defaultIcon.options.iconSize || [0, 0]);
    const iconAnchorPoint = L.point(
      defaultIcon.options.iconAnchor || [
        iconSizePoint.x / 2,
        iconSizePoint.y / 2,
      ],
    );
    return {
      x: iconAnchorPoint.x - iconSizePoint.x / 2,
      y: iconAnchorPoint.y - iconSizePoint.y / 2,
    };
  }, []);

  // Fetch data from Google Sheets
  const {
    capstonesData,
    loading: capstonesLoading,
    error: _capstonesError,
  } = useCapstonesData();
  const {
    communityData,
    loading: communityLoading,
    error: _communityError,
  } = useCommunityData();

  // Get the selected dataset
  const getSelectedData = useMemo(() => {
    return activeDataset === "capstones" ? capstonesData : communityData;
  }, [activeDataset, capstonesData, communityData]);

  // Determine loading state
  const isLoading = useMemo(() => {
    return activeDataset === "capstones" ? capstonesLoading : communityLoading;
  }, [activeDataset, capstonesLoading, communityLoading]);

  // Get highlighted country codes
  const highlightedCountryCodes = useMemo(() => {
    const countries: string[] = [];
    getSelectedData.forEach((uni: University) => {
      const countryCode = countryNameToCode[uni.country];
      if (countryCode && !countries.includes(countryCode)) {
        countries.push(countryCode);
      }
    });
    return countries;
  }, [getSelectedData]);

  // Fetch GeoJSON data
  useEffect(() => {
    const controller = new AbortController();

    const fetchGeoData = async () => {
      try {
        const response = await fetch(GEO_JSON_URL, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`Failed to fetch GeoJSON: ${response.status}`);
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching GeoJSON data:", error);
        }
      }
    };

    fetchGeoData();
    return () => controller.abort();
  }, []);

  // Country styling function
  const getCountryStyle = (
    feature?: Feature<Geometry, GeoJsonProperties>,
  ): L.PathOptions => {
    const featureId =
      feature && typeof feature.id === "string" ? feature.id : "";
    const isHighlighted = highlightedCountryCodes.includes(featureId);
    return {
      fillColor: isHighlighted
        ? "var(--color-primary-navy)"
        : "var(--color-muted)",
      weight: 1,
      opacity: 1,
      color: "var(--color-muted-foreground)",
      fillOpacity: isHighlighted ? 0.7 : 0.2,
    };
  };

  // Handle marker hover - show popup
  const handleMarkerHover = (
    university: University,
    event?: L.LeafletMouseEvent,
  ) => {
    if (!mapInstance && !event) return;

    // If event is provided, use it for positioning, otherwise calculate from map
    let position: TooltipPosition;
    if (event) {
      position = {
        x: event.containerPoint.x - markerCenterOffset.x,
        y: event.containerPoint.y - markerCenterOffset.y,
      };
    } else if (mapInstance) {
      const point = mapInstance.latLngToContainerPoint([
        university.latitude,
        university.longitude,
      ]);
      position = {
        x: point.x - markerCenterOffset.x,
        y: point.y - markerCenterOffset.y,
      };
    } else {
      return;
    }

    setSelectedUniversity(university);
    setTooltipPosition(position);
    setIsTooltipVisible(true);
  };

  const handleMarkerHoverOut = () => {
    setIsTooltipVisible(false);
    setSelectedUniversity(null);
    setTooltipPosition(null);
  };

  // Reset popup when dataset changes
  useEffect(() => {
    if (!activeDataset) return;
    setIsTooltipVisible(false);
    setSelectedUniversity(null);
    setTooltipPosition(null);
  }, [activeDataset]);

  useEffect(() => {
    if (!mapInstance || !selectedUniversity) return;

    const updatePosition = () => {
      const point = mapInstance.latLngToContainerPoint([
        selectedUniversity.latitude,
        selectedUniversity.longitude,
      ]);
      setTooltipPosition({
        x: point.x - markerCenterOffset.x,
        y: point.y - markerCenterOffset.y,
      });
    };

    updatePosition();
    mapInstance.on("move", updatePosition);
    mapInstance.on("zoom", updatePosition);

    return () => {
      mapInstance.off("move", updatePosition);
      mapInstance.off("zoom", updatePosition);
    };
  }, [mapInstance, selectedUniversity, markerCenterOffset]);

  return (
    <div
      className="partner-map-container relative space-y-6"
      ref={mapContainerRef}
    >
      {/* Dataset Selection Buttons */}
      <div className="flex justify-center mt-6">
        <div className="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveDataset("capstones")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeDataset === "capstones"
                ? "bg-brand-navy text-white shadow-sm"
                : "text-white hover:bg-white/20"
            }`}
          >
            Capstones
          </button>
          <button
            type="button"
            onClick={() => setActiveDataset("community")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeDataset === "community"
                ? "bg-brand-navy text-white shadow-sm"
                : "text-white hover:bg-white/20"
            }`}
          >
            Community
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[350px] w-full rounded-lg mt-6 relative">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-muted-foreground">Loading map data...</p>
          </div>
        ) : (
          <MapContainer
            center={[20, 0]}
            zoom={1}
            minZoom={1}
            maxZoom={18}
            maxBounds={[
              [-60, -180],
              [85, 180],
            ]}
            className="h-full w-full rounded-lg"
            zoomControl={true}
          >
            <MapController setMapInstance={setMapInstance} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {geoJsonData && (
              <GeoJSON data={geoJsonData} style={getCountryStyle} />
            )}

            <MarkerClusterGroup
              universities={getSelectedData}
              onMarkerHover={handleMarkerHover}
              onMarkerHoverOut={handleMarkerHoverOut}
            />
          </MapContainer>
        )}

        {/* University Popup */}
        {isTooltipVisible && selectedUniversity && tooltipPosition && (
          <div
            className="absolute z-[1000] bg-white border border-gray-300 rounded-lg shadow-xl pointer-events-none min-w-[200px] max-w-[280px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            <div className="p-4 text-center">
              <h3 className="font-semibold text-black text-base leading-tight mb-2">
                {selectedUniversity.university}
              </h3>
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-orange"></span>
                {selectedUniversity.country}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(LandingMap);
