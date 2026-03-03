import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "../Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("applies primary variant classes by default", () => {
    const { container } = render(<Button>Primary</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-brand-orange");
    expect(button).toHaveClass("border-brand-orange");
  });

  it("applies secondary variant classes", () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-brand-orange");
    // Note: based on code, secondary also has bg-brand-orange but no border-dashed
    expect(button).not.toHaveClass("border-dashed");
  });

  it("applies discord variant classes", () => {
    const { container } = render(<Button variant="discord">Discord</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-brand-blue");
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveClass("pointer-events-none");
  });

  it("applies fullWidth class", () => {
    const { container } = render(<Button fullWidth>Full Width</Button>);
    expect(container.querySelector("button")).toHaveClass("w-full");
  });

  it("applies small size classes", () => {
    const { container } = render(<Button size="small">Small</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("px-5");
    expect(button).toHaveClass("text-sm");
  });

  it("forwards additional props", () => {
    render(
      <Button data-testid="custom-button" type="submit">
        Submit
      </Button>,
    );
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
