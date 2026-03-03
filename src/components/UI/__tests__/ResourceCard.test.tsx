import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResourceCard from "../ResourceCard";

describe("ResourceCard", () => {
  const mockProps = {
    title: "Test Resource",
    docUrl: "https://example.com/doc",
    readTimeMinutes: 5,
  };

  it("renders title and read time correctly", () => {
    render(<ResourceCard {...mockProps} />);
    expect(screen.getByText("Test Resource")).toBeInTheDocument();
    expect(screen.getByText("5 min read")).toBeInTheDocument();
  });

  it("does not render Google Docs icon", () => {
    render(<ResourceCard {...mockProps} />);
    expect(screen.queryByAltText("Google Docs")).not.toBeInTheDocument();
  });

  it("opens URL in a new tab when clicked", () => {
    const windowOpenSpy = vi
      .spyOn(window, "open")
      .mockImplementation(() => null);
    render(<ResourceCard {...mockProps} />);

    fireEvent.click(screen.getByText("Test Resource"));

    expect(windowOpenSpy).toHaveBeenCalledWith(
      "https://example.com/doc",
      "_blank",
      "noopener,noreferrer",
    );

    windowOpenSpy.mockRestore();
  });
});
