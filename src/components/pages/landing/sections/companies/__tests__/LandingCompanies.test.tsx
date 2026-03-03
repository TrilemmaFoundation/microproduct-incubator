import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as useCompaniesDataHook from "../../../../../../hooks/useCompaniesData";
import LandingCompanies from "../LandingCompanies";

// Mock the hook
vi.mock("../../../../../../hooks/useCompaniesData", () => ({
  useCompaniesData: vi.fn(),
}));

describe("LandingCompanies", () => {
  it("renders nothing when loading", () => {
    vi.spyOn(useCompaniesDataHook, "useCompaniesData").mockReturnValue({
      companies: [],
      loading: true,
      error: null,
    });
    const { container } = render(<LandingCompanies />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing on error", () => {
    vi.spyOn(useCompaniesDataHook, "useCompaniesData").mockReturnValue({
      companies: [],
      loading: false,
      error: "Failed",
    });
    const { container } = render(<LandingCompanies />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders company logos correctly", () => {
    const mockCompanies = [
      {
        company: "Company A",
        companySlug: "comp-a",
        companyUrl: "https://a.com",
        category: "Tech",
      },
      {
        company: "Company B",
        companySlug: "comp-b",
        companyUrl: "https://b.com",
        category: "Finance",
      },
    ];

    vi.spyOn(useCompaniesDataHook, "useCompaniesData").mockReturnValue({
      companies: mockCompanies,
      loading: false,
      error: null,
    });

    render(<LandingCompanies />);

    // Check for images
    const imgA = screen.getByAltText("Company A logo");
    const imgB = screen.getByAltText("Company B logo");

    expect(imgA).toBeInTheDocument();
    expect(imgB).toBeInTheDocument();

    // Check attributes
    expect(imgA).toHaveAttribute("src", "/companies/comp-a.svg");
    expect(imgA.closest("a")).toHaveAttribute("href", "https://a.com");

    expect(imgB).toHaveAttribute("src", "/companies/comp-b.svg");
    expect(imgB.closest("a")).toHaveAttribute("href", "https://b.com");
  });

  it("applies lazy loading attributes to images", () => {
    const mockCompanies = [
      {
        company: "Company A",
        companySlug: "comp-a",
        companyUrl: "https://a.com",
        category: "Tech",
      },
    ];

    vi.spyOn(useCompaniesDataHook, "useCompaniesData").mockReturnValue({
      companies: mockCompanies,
      loading: false,
      error: null,
    });

    render(<LandingCompanies />);
    const img = screen.getByAltText("Company A logo");

    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("hides image on error", () => {
    const mockCompanies = [
      {
        company: "Company A",
        companySlug: "comp-a",
        companyUrl: "https://a.com",
        category: "Tech",
      },
    ];

    vi.spyOn(useCompaniesDataHook, "useCompaniesData").mockReturnValue({
      companies: mockCompanies,
      loading: false,
      error: null,
    });

    render(<LandingCompanies />);
    const img = screen.getByAltText("Company A logo");

    // Simulate error
    fireEvent.error(img);

    expect(img).toHaveStyle({ display: "none" });
  });
});
