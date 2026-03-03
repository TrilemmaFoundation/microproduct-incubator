import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrimaryButton from "../PrimaryButton";

describe("PrimaryButton", () => {
  it("renders children", () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("passes fullWidth to underlying Button", () => {
    const { container } = render(<PrimaryButton fullWidth>Full</PrimaryButton>);
    expect(container.querySelector("button")).toHaveClass("w-full");
  });

  it("passes small size to underlying Button", () => {
    const { container } = render(
      <PrimaryButton size="small">Small</PrimaryButton>,
    );
    expect(container.querySelector("button")).toHaveClass("text-sm");
  });

  it("applies primary variant styling", () => {
    const { container } = render(<PrimaryButton>Primary</PrimaryButton>);
    expect(container.querySelector("button")).toHaveClass("bg-brand-orange");
  });

  it("forwards additional HTML button props", () => {
    render(
      <PrimaryButton type="submit" data-testid="primary-btn">
        Submit
      </PrimaryButton>,
    );
    const btn = screen.getByTestId("primary-btn");
    expect(btn).toHaveAttribute("type", "submit");
  });
});
