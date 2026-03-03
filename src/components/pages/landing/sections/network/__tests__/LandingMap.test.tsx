import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingMap from "../LandingMap";

import { useCapstonesData } from "../../../../../../hooks/useCapstonesData";
import { useCommunityData } from "../../../../../../hooks/useCommunityData";

// Mock the hooks
vi.mock("../../../../../../hooks/useCapstonesData", () => ({
    useCapstonesData: vi.fn(),
}));

vi.mock("../../../../../../hooks/useCommunityData", () => ({
    useCommunityData: vi.fn(),
}));

// Mock leaflet and react-leaflet
vi.mock("react-leaflet", () => {
    const mockMapInstance = {
        on: vi.fn(),
        off: vi.fn(),
        latLngToContainerPoint: vi.fn(),
    };
    return {
        MapContainer: ({ children }: any) => (
            <div data-testid="map-container">{children}</div>
        ),
        TileLayer: () => <div data-testid="tile-layer" />,
        GeoJSON: () => <div data-testid="geojson" />,
        useMapEvents: () => mockMapInstance,
    };
});

vi.mock("leaflet", () => {
    return {
        default: {
            icon: vi.fn(() => ({ options: { iconSize: [25, 41], iconAnchor: [12, 41] } })),
            Marker: { prototype: { options: {} } },
            point: vi.fn((arr: any) => ({ x: arr[0], y: arr[1] })),
        },
    };
});

vi.mock("../MarkerClusterGroup", () => ({
    default: () => (
        <div data-testid="marker-cluster-group-mock">Clusters</div>
    ),
}));

// Mock global fetch for the GeoJSON
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ type: "FeatureCollection", features: [] }),
    })
) as unknown as typeof fetch;

describe("LandingMap", () => {
    it("renders loading state initially or when data is loading", () => {
        (useCapstonesData as any).mockReturnValue({ capstonesData: [], loading: true, error: null });
        (useCommunityData as any).mockReturnValue({ communityData: [], loading: true, error: null });

        render(<LandingMap />);
        expect(screen.getByText("Loading map data...")).toBeInTheDocument();
    });

    it("renders map container when data is loaded", () => {
        (useCapstonesData as any).mockReturnValue({ capstonesData: [], loading: false, error: null });
        (useCommunityData as any).mockReturnValue({ communityData: [], loading: false, error: null });

        render(<LandingMap />);
        // The "Community" dataset is default
        expect(screen.getByTestId("map-container")).toBeInTheDocument();
        expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
    });

    it("switches dataset to capstones and community on button clicks", () => {
        (useCapstonesData as any).mockReturnValue({ capstonesData: [], loading: false, error: null });
        (useCommunityData as any).mockReturnValue({ communityData: [], loading: false, error: null });

        render(<LandingMap />);

        const capstonesBtn = screen.getByText("Capstones");
        const communityBtn = screen.getByText("Community");

        expect(communityBtn.className).toContain("bg-brand-navy");

        // Click capstones
        fireEvent.click(capstonesBtn);
        expect(capstonesBtn.className).toContain("bg-brand-navy");
        expect(communityBtn.className).not.toContain("bg-brand-navy");
    });
});
