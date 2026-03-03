import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TwoColumnSection from "../TwoColumnSection";

describe("TwoColumnSection", () => {
  const Left = () => <div data-testid="left-col">Left</div>;
  const Right = () => <div data-testid="right-col">Right</div>;

  it("renders both columns", () => {
    render(<TwoColumnSection leftColumn={<Left />} rightColumn={<Right />} />);
    expect(screen.getByTestId("left-col")).toBeInTheDocument();
    expect(screen.getByTestId("right-col")).toBeInTheDocument();
  });

  it("wraps in section by default", () => {
    const { container } = render(
      <TwoColumnSection leftColumn={<Left />} rightColumn={<Right />} />,
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("does not wrap in section when wrapInSection is false", () => {
    const { container } = render(
      <TwoColumnSection
        leftColumn={<Left />}
        rightColumn={<Right />}
        wrapInSection={false}
      />,
    );
    expect(container.querySelector("section")).not.toBeInTheDocument();
  });

  it("applies custom padding Y by default", () => {
    const { container } = render(
      <TwoColumnSection
        leftColumn={<Left />}
        rightColumn={<Right />}
        paddingY="py-12"
      />,
    );
    expect(container.querySelector(".py-12")).toBeInTheDocument();
  });

  it("applies specific padding top and bottom", () => {
    const { container } = render(
      <TwoColumnSection
        leftColumn={<Left />}
        rightColumn={<Right />}
        paddingTop="pt-10"
        paddingBottom="pb-16"
      />,
    );
    expect(container.querySelector(".pt-10")).toBeInTheDocument();
    expect(container.querySelector(".pb-16")).toBeInTheDocument();
  });

  it("applies only padding top", () => {
    const { container } = render(
      <TwoColumnSection
        leftColumn={<Left />}
        rightColumn={<Right />}
        paddingTop="pt-10"
      />,
    );
    expect(container.querySelector(".pt-10")).toBeInTheDocument();
  });

  it("applies only padding bottom", () => {
    const { container } = render(
      <TwoColumnSection
        leftColumn={<Left />}
        rightColumn={<Right />}
        paddingBottom="pb-10"
      />,
    );
    expect(container.querySelector(".pb-10")).toBeInTheDocument();
  });

  it("handles mobile reverse ordering", () => {
    render(
      <TwoColumnSection
        leftColumn={<Left />}
        rightColumn={<Right />}
        reverseOnMobile
      />,
    );
    // Left column gets order-2
    expect(screen.getByTestId("left-col").parentElement).toHaveClass("order-2");
    // Right column gets order-1
    expect(screen.getByTestId("right-col").parentElement).toHaveClass(
      "order-1",
    );
  });
});
