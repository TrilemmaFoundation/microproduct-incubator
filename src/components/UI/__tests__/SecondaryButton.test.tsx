import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SecondaryButton from "../SecondaryButton";

describe("SecondaryButton", () => {
  it("renders children correctly", () => {
    render(<SecondaryButton>Click Me</SecondaryButton>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("applies base and default styles", () => {
    const { container } = render(
      <SecondaryButton>Styled Button</SecondaryButton>,
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-brand-orange");
    expect(button).toHaveClass("text-foreground");
  });

  it("handles fullWidth prop", () => {
    const { container } = render(
      <SecondaryButton fullWidth>Full Width</SecondaryButton>,
    );
    expect(container.querySelector("button")).toHaveClass("w-full");
  });

  it("handles disabled state", () => {
    render(<SecondaryButton disabled>Disabled</SecondaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("forwards additional props", () => {
    const onClick = vi.fn();
    render(<SecondaryButton onClick={onClick}>Click Me</SecondaryButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
