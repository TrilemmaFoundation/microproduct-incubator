import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import type { University } from "./LandingMap";

interface MarkerClusterGroupProps {
  universities: University[];
  onMarkerHover: (university: University, event?: L.LeafletMouseEvent) => void;
  onMarkerHoverOut: () => void;
}

/**
 * MarkerClusterGroup component that wraps Leaflet.markercluster
 * This component handles marker clustering for better performance and UX
 */
const MarkerClusterGroup: React.FC<MarkerClusterGroupProps> = ({
  universities,
  onMarkerHover,
  onMarkerHoverOut,
}) => {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [useClustering, setUseClustering] = useState(false);

  useEffect(() => {
    // Check if MarkerClusterGroup is available
    const hasClustering = typeof L.MarkerClusterGroup !== "undefined";
    setUseClustering(hasClustering);

    if (!hasClustering) {
      console.warn(
        "MarkerClusterGroup not available. Please install leaflet.markercluster package. Falling back to individual markers.",
      );
      return;
    }

    // Create cluster group with optimized settings
    const clusterGroup = new L.MarkerClusterGroup({
      maxClusterRadius: 80, // Pixels - adjust for clustering sensitivity
      spiderfyOnMaxZoom: true, // Expand clusters at max zoom
      showCoverageOnHover: false, // Disable hover coverage to prevent interference
      zoomToBoundsOnClick: true, // Zoom to cluster bounds on click
      chunkedLoading: true, // Load markers in chunks for better performance
      chunkDelay: 200, // Delay between chunks
      // Custom icon for clusters
      iconCreateFunction: (cluster: L.MarkerCluster) => {
        const count = cluster.getChildCount();
        let size = "small";
        if (count > 50) size = "large";
        else if (count > 15) size = "medium";

        return L.divIcon({
          html: `<div class="custom-cluster-core custom-cluster-${size}"><span class="custom-cluster-count">${count}</span></div>`,
          className: "custom-marker-cluster",
          iconSize: L.point(40, 40),
        });
      },
    });

    // Create markers and add to cluster group
    const markers: L.Marker[] = [];
    universities.forEach((university) => {
      const marker = L.marker([university.latitude, university.longitude], {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      });

      marker.on("mouseover", (e: L.LeafletMouseEvent) => {
        onMarkerHover(university, e);
      });
      marker.on("mouseout", () => {
        onMarkerHoverOut();
      });

      clusterGroup.addLayer(marker);
      markers.push(marker);
    });

    clusterGroup.on("mouseout", () => {
      onMarkerHoverOut();
    });

    // Add cluster group to map
    map.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;
    markersRef.current = markers;

    // Cleanup function
    return () => {
      if (clusterGroupRef.current) {
        // Remove all markers from cluster group
        markersRef.current.forEach((marker) => {
          clusterGroupRef.current?.removeLayer(marker);
        });
        // Remove cluster group from map
        map.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current = null;
        markersRef.current = [];
      }
    };
  }, [map, universities, onMarkerHover, onMarkerHoverOut]);

  // Fallback: render individual markers if clustering is not available
  if (!useClustering) {
    return (
      <>
        {universities.map((university, index) => (
          <Marker
            key={`${university.university}-${index}`}
            position={[university.latitude, university.longitude]}
            eventHandlers={{
              mouseover: (e: L.LeafletMouseEvent) =>
                onMarkerHover(university, e),
              mouseout: () => onMarkerHoverOut(),
            }}
          />
        ))}
      </>
    );
  }

  // This component doesn't render anything visible when clustering is active
  // It manages the cluster group through Leaflet's API
  return null;
};

export default MarkerClusterGroup;
