import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DiscordButton from "../DiscordButton";

describe("DiscordButton", () => {
  it("renders as an anchor element with 'Apply to Mentor' text", () => {
    render(<DiscordButton />);
    const link = screen.getByRole("link", { name: /apply to mentor/i });
    expect(link).toBeInTheDocument();
  });

  it("links to the mentor form with target=_blank", () => {
    render(<DiscordButton />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.getAttribute("href")).toContain("google.com/forms");
  });

  it("applies brand-blue styling", () => {
    render(<DiscordButton />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("bg-brand-blue");
  });

  it("applies fullWidth class when prop is set", () => {
    render(<DiscordButton fullWidth />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("w-full");
  });

  it("applies small size classes", () => {
    render(<DiscordButton size="small" />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("text-sm");
  });

  it("merges custom className", () => {
    render(<DiscordButton className="my-custom" />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("my-custom");
  });
});
