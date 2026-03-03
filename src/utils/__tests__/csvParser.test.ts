import { describe, expect, it } from "vitest";
import { parseCSVLine } from "../csvParser";

describe("parseCSVLine", () => {
  it("parses simple comma-separated values", () => {
    expect(parseCSVLine("a,b,c")).toEqual(["a", "b", "c"]);
  });

  it("handles quoted values with commas", () => {
    expect(parseCSVLine('a,"b,c",d')).toEqual(["a", "b,c", "d"]);
  });

  it("handles escaped quotes inside quoted values", () => {
    expect(parseCSVLine('a,"b""c",d')).toEqual(["a", 'b"c', "d"]);
  });

  it("trims whitespace from values", () => {
    expect(parseCSVLine("  a  ,  b  ")).toEqual(["a", "b"]);
  });

  it("handles empty values", () => {
    expect(parseCSVLine("a,,c")).toEqual(["a", "", "c"]);
  });

  it("handles multiple quoted fields", () => {
    expect(parseCSVLine('"Field 1","Field 2",Field 3')).toEqual([
      "Field 1",
      "Field 2",
      "Field 3",
    ]);
  });

  it("handles empty quoted fields", () => {
    expect(parseCSVLine('a,"",c')).toEqual(["a", "", "c"]);
  });

  it("handles quotes at the end of values", () => {
    // Current behavior: trailing quote in unquoted field is lost
    expect(parseCSVLine('a,b"')).toEqual(["a", "b"]);
    expect(parseCSVLine('a,"b"""')).toEqual(["a", 'b"']);
  });

  it("handles fields with leading/trailing spaces outside quotes", () => {
    expect(parseCSVLine('  "a"  ,  "b"  ')).toEqual(["a", "b"]);
  });

  it("handles commas inside quotes with spaces", () => {
    expect(parseCSVLine(' "a, b" , "c, d" ')).toEqual(["a, b", "c, d"]);
  });

  it("handles mixed quoted and unquoted fields", () => {
    expect(parseCSVLine('unquoted,"quoted",more unquoted')).toEqual([
      "unquoted",
      "quoted",
      "more unquoted",
    ]);
  });

  it("handles very long lines", () => {
    const longLine = `${"a".repeat(1000)},${"b".repeat(1000)}`;
    expect(parseCSVLine(longLine)).toEqual([
      "a".repeat(1000),
      "b".repeat(1000),
    ]);
  });
});
