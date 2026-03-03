import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from "../StatusBadge";

describe("StatusBadge", () => {
  it("renders children correctly", () => {
    render(<StatusBadge variant="completed">Done</StatusBadge>);
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("applies completed variant classes", () => {
    const { container } = render(
      <StatusBadge variant="completed">Completed</StatusBadge>,
    );
    expect(container.firstChild).toHaveClass("bg-[#FF9940]");
    expect(container.firstChild).toHaveClass("text-brand-navy");
  });

  it("applies dropped variant classes", () => {
    const { container } = render(
      <StatusBadge variant="dropped">Dropped</StatusBadge>,
    );
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  it("applies inProgress variant classes", () => {
    const { container } = render(
      <StatusBadge variant="inProgress">In Progress</StatusBadge>,
    );
    expect(container.firstChild).toHaveClass("bg-brand-amber");
  });

  it("applies onboarding variant classes", () => {
    const { container } = render(
      <StatusBadge variant="onboarding">Onboarding</StatusBadge>,
    );
    expect(container.firstChild).toHaveClass("bg-brand-blue");
  });

  it("merges custom className", () => {
    const { container } = render(
      <StatusBadge variant="completed" className="custom-class">
        Badge
      </StatusBadge>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
