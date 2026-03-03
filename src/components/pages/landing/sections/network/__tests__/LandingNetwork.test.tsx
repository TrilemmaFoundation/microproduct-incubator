import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingNetwork from "../LandingNetwork";

vi.mock("../LandingMap", () => ({
    default: () => <div data-testid="landing-map-mock">Map</div>,
}));

vi.mock("../LandingNetworkStats", () => ({
    default: () => <div data-testid="landing-network-stats-mock">Stats</div>,
}));

describe("LandingNetwork", () => {
    it("renders the section title and the imported components", () => {
        render(<LandingNetwork />);

        expect(screen.getByText(/Onboard/i)).toBeInTheDocument();
        expect(screen.getByText(/a Global Talent Network/i)).toBeInTheDocument();
        expect(screen.getByTestId("landing-map-mock")).toBeInTheDocument();
        expect(screen.getByTestId("landing-network-stats-mock")).toBeInTheDocument();
    });
});
