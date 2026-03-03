import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OptimizedImage from "../OptimizedImage";

describe("OptimizedImage", () => {
  it("renders with required props", () => {
    render(
      <OptimizedImage
        src="test.jpg"
        alt="Test Image"
        width={100}
        height={100}
      />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "Test Image");
    expect(img).toHaveAttribute("width", "100");
    expect(img).toHaveAttribute("height", "100");
  });

  it("applies lazy loading and async decoding by default", () => {
    render(<OptimizedImage src="test.jpg" alt="test" width={10} height={10} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("applies eager loading and sync decoding when eager is true", () => {
    render(
      <OptimizedImage src="test.jpg" alt="test" width={10} height={10} eager />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("decoding", "sync");
  });

  it("handles fallbackSrc on error", () => {
    render(
      <OptimizedImage
        src="bad.jpg"
        alt="test"
        width={10}
        height={10}
        fallbackSrc="fallback.jpg"
      />,
    );
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", "fallback.jpg");
  });

  it("does not change src if src is already fallbackSrc", () => {
    render(
      <OptimizedImage
        src="fallback.jpg"
        alt="test"
        width={10}
        height={10}
        fallbackSrc="fallback.jpg"
      />,
    );
    const img = screen.getByRole("img");
    // Trigger error on the fallback image itself
    fireEvent.error(img);
    // Should still be fallback.jpg, no infinite loops
    expect(img).toHaveAttribute("src", "fallback.jpg");
  });

  it("forwards additional props and className", () => {
    render(
      <OptimizedImage
        src="test.jpg"
        alt="test"
        width={10}
        height={10}
        className="custom-img"
        data-testid="my-img"
      />,
    );
    const img = screen.getByTestId("my-img");
    expect(img).toHaveClass("custom-img");
  });
});
