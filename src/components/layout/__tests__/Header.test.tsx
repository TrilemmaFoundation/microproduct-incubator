import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Header from "../Header";

// Mock useBodyScrollLock as it's tested separately
vi.mock("../../../hooks/useBodyScrollLock", () => ({
  useBodyScrollLock: vi.fn(),
}));

describe("Header", () => {
  const renderHeader = (initialRoute = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Header />
      </MemoryRouter>,
    );
  };

  it("renders logo link pointing to home", () => {
    renderHeader();
    const logoLink = screen.getByRole("link", {
      name: /trilemma foundation logo/i,
    });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("toggles mobile menu on button click", () => {
    renderHeader();
    const menuButton = screen.getByLabelText(/open menu/i);

    // Open
    fireEvent.click(menuButton);
    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();

    // Close
    fireEvent.click(menuButton); // The same button toggles it
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  it("closes mobile menu when escape key is pressed", async () => {
    renderHeader();
    const menuButton = screen.getByLabelText(/open menu/i);

    fireEvent.click(menuButton);
    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    // After Escape, it should be back to "Open menu"
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  it("closes mobile menu when clicking outside", () => {
    renderHeader();
    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);
    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  it("closes mobile menu on window resize to desktop width", () => {
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    renderHeader();
    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);

    // Simulate resize
    window.innerWidth = 1200;
    fireEvent(window, new Event("resize"));

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();

    // Reset
    window.innerWidth = originalWidth;
  });
});
