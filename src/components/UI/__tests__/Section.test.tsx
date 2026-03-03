import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Section from "../Section";

describe("Section", () => {
  it("renders children", () => {
    render(<Section>Hello World</Section>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("wraps content in a <section> element", () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("applies default max-w-6xl wrapper", () => {
    const { container } = render(<Section>Content</Section>);
    const wrapper = container.querySelector(".max-w-6xl");
    expect(wrapper).toBeInTheDocument();
  });

  it("applies custom maxWidth class", () => {
    const { container } = render(
      <Section maxWidth="max-w-4xl">Content</Section>,
    );
    expect(container.querySelector(".max-w-4xl")).toBeInTheDocument();
    expect(container.querySelector(".max-w-6xl")).not.toBeInTheDocument();
  });

  it("removes maxWidth wrapper when set to null", () => {
    const { container } = render(<Section maxWidth={null}>Content</Section>);
    expect(container.querySelector(".max-w-6xl")).not.toBeInTheDocument();
  });

  it("removes maxWidth wrapper when set to empty string", () => {
    const { container } = render(<Section maxWidth="">Content</Section>);
    expect(container.querySelector(".max-w-6xl")).not.toBeInTheDocument();
  });

  it("applies hero padding when isHero is true", () => {
    const { container } = render(<Section isHero>Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("pt-28");
  });

  it("applies default non-hero padding", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-14");
  });

  it("applies custom padding when provided", () => {
    const { container } = render(<Section padding="py-8">Content</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-8");
    expect(section?.className).not.toContain("py-14");
  });

  it("applies id attribute", () => {
    const { container } = render(<Section id="my-section">Content</Section>);
    expect(container.querySelector("#my-section")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(
      <Section className="custom-class">Content</Section>,
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });
});
