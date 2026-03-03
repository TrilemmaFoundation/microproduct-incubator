import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingNetworkStats from "../LandingNetworkStats";
import { useCommunityData } from "../../../../../../hooks/useCommunityData";
import { useMembersData } from "../../../../../../hooks/useMembersData";

// Mock the hooks
vi.mock("../../../../../../hooks/useCommunityData", () => ({
    useCommunityData: vi.fn(),
}));

vi.mock("../../../../../../hooks/useMembersData", () => ({
    useMembersData: vi.fn(),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
    callback: any;
    constructor(callback: any) {
        this.callback = callback;
    }
    observe() {
        this.callback([{ isIntersecting: true }]);
    }
    unobserve() { }
    disconnect() { }
}
window.IntersectionObserver = MockIntersectionObserver as any;

const originalNow = Date.now;
window.requestAnimationFrame = (cb: any) => {
    vi.spyOn(Date, 'now').mockReturnValue(originalNow() + 3000);
    cb(0);
    vi.restoreAllMocks();
    return 0;
};

describe("LandingNetworkStats", () => {
    it("renders the community and members data correctly", () => {
        (useCommunityData as any).mockReturnValue({
            communityData: [
                { university: "Uni 1", latitude: 0, longitude: 0, country: "USA" },
                { university: "Uni 2", latitude: 0, longitude: 0, country: "CAN" },
            ],
            loading: false,
            error: null,
        });

        (useMembersData as any).mockReturnValue({
            capstoneStudentsCount: 45,
            loading: false,
            error: null,
        });

        render(<LandingNetworkStats />);

        expect(screen.getByText("Students Engaged")).toBeInTheDocument();
        expect(screen.getByText("Universities Reached")).toBeInTheDocument();
        expect(screen.getByText("Capstone Students")).toBeInTheDocument();

        // With animations disabled/mocked, the target doesn't immediately show up fully in jsdom unless we simulate IntersectionObserver.
        // However, the elements have "2000+", "45", "2"
        expect(screen.getByText("2,000+")).toBeInTheDocument();
        expect(screen.getByText("45")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });
});
