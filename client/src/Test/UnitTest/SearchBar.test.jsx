import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

// Test the SearchBar component
test("renders search bar and updates search state on input change", () => {
  const setSearch = jest.fn();
  render(<SearchBar search="" setSearch={setSearch} />);
  
  // Check if the search input is rendered
  const input = screen.getByPlaceholderText("Search countries by name, region, or language...");
  expect(input).toBeInTheDocument();
  
  // Check if the input is empty initially
  fireEvent.change(input, { target: { value: "France" } });
  expect(setSearch).toHaveBeenCalledWith("France");
});