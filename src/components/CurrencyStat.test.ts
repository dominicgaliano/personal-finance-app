import { render } from "@testing-library/svelte";
import CurrencyStat from "./CurrencyStat.svelte";

it("displays the given value formatted as currency", () => {
  const { queryByText } = render(CurrencyStat, { value: 1234.56 });
  expect(queryByText("$1,234.56")).toBeInTheDocument();
});
