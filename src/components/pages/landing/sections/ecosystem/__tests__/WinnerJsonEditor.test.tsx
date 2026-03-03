import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WinnerJsonEditor from "../WinnerJsonEditor";

describe("WinnerJsonEditor", () => {
  const mockInfo = {
    tournament: "Stacking Sats x Strategy",
    university: "Georgia Institute of Technology",
    program: "MS Analytics",
    region: "Dubai, UAE 🇦🇪",
  };

  it("renders JSON content correctly", () => {
    const { container } = render(<WinnerJsonEditor info={mockInfo} />);
    // Use textContent because of span splitting for syntax highlighting
    expect(container.textContent).toContain("tournament");
    expect(container.textContent).toContain("Stacking Sats x Strategy");
    expect(container.textContent).toContain("university");
    expect(container.textContent).toContain("Georgia Institute of Technology");
  });

  it("handles copy button", async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    render(<WinnerJsonEditor info={mockInfo} />);
    const copyBtn = screen.getByRole("button", { name: /copy/i });
    fireEvent.click(copyBtn);

    expect(mockWriteText).toHaveBeenCalled();
  });
});
