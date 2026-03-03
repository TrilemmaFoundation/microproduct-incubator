import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionTitle from "../SectionTitle";

describe("SectionTitle", () => {
  it("renders orange and white parts of the title", () => {
    render(<SectionTitle orange="Orange" white="White" />);
    expect(screen.getByText("Orange")).toBeInTheDocument();
    expect(screen.getByText("White")).toBeInTheDocument();
    expect(screen.getByText("Orange")).toHaveClass("text-brand-orange");
    expect(screen.getByText("White")).toHaveClass("text-white");
  });

  it("renders only orange part if white is not provided", () => {
    render(<SectionTitle orange="Only Orange" />);
    expect(screen.getByText("Only Orange")).toBeInTheDocument();
    expect(screen.queryByText("White")).not.toBeInTheDocument();
  });

  it("renders custom heading tag", () => {
    const { container } = render(<SectionTitle orange="Title" as="h2" />);
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("defaults to h1 tag", () => {
    const { container } = render(<SectionTitle orange="Title" />);
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionTitle orange="Title" subtitle="This is a subtitle" />);
    expect(screen.getByText("This is a subtitle")).toBeInTheDocument();
  });

  it("applies alignment classes", () => {
    const { container: centerContainer } = render(
      <SectionTitle orange="Title" align="center" />,
    );
    expect(centerContainer.firstChild).toHaveClass("text-center");

    const { container: leftContainer } = render(
      <SectionTitle orange="Title" align="left" />,
    );
    expect(leftContainer.firstChild).toHaveClass("text-left");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SectionTitle orange="Title" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
