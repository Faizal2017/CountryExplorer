import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

// Mock the SearchBar component to avoid unnecessary complexity in tests
describe("SearchBar Component Integration Test", () => {
  const mockSetSearch = jest.fn();
  const initialSearch = "";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly and handles input changes", () => {
    render(<SearchBar search={initialSearch} setSearch={mockSetSearch} />);

    // Select input by placeholder text since no aria-label is defined
    const input = screen.getByPlaceholderText(
      "Search countries by name, region, or language..."
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: "Canada" } });
    expect(mockSetSearch).toHaveBeenCalledWith("Canada");
  });

  test("displays search text and clear button when search is not empty", () => {
    render(<SearchBar search="Canada" setSearch={mockSetSearch} />);

    // Verifies search state text appears
    expect(screen.getByText(/searching for:/i)).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();

    // Find the clear button (it's the only button rendered conditionally)
    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();

    // Simulate clear button click
    fireEvent.click(clearButton);
    expect(mockSetSearch).toHaveBeenCalledWith("");
  });
});
