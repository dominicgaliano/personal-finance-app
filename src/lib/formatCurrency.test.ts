import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  test("Adds the $ before a number", () => {
    expect(formatCurrency(1)).toBe("$1.00");
  });
  test("Adds the $ before a number", () => {
    expect(formatCurrency(1000)).toBe("$1,000.00");
  });
  test("Adds the $ before a number", () => {
    expect(formatCurrency(-1)).toBe("-$1.00");
  });
  test("Adds the $ before a number", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });
});
