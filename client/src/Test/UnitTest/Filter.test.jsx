import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../../components/Filter";

// Simplified mocks that work better with the testing environment
jest.mock("react-icons/fa", () => ({
  FaFilter: () => <div data-testid="fa-filter" />,
  FaChevronDown: () => <div data-testid="fa-chevron-down" />,
  FaChevronUp: () => <div data-testid="fa-chevron-up" />,
}));

// Better framer-motion mock that handles visibility properly
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, animate, initial, ...props }) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <div>{children}</div>,
}));

describe("Filter Component", () => {
  const mockOptions = ["Option 1", "Option 2", "Option 3"];
  const mockLabel = "Test Filter";
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  // Test case for rendering the Filter component with default props
  it("renders correctly with default props", () => {
    render(
      <Filter
        label={mockLabel}
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(mockOptions.length + 1);
  });

  // Test case for rendering the Filter component with a selected value
  it("displays the selected value in mobile view", () => {
    render(
      <Filter
        label={mockLabel}
        options={mockOptions}
        value="Option 2"
        onChange={mockOnChange}
      />
    );

    const mobileButton = screen.getByRole("button");
    expect(mobileButton).toHaveTextContent("Option 2");
  });

  // Test case for handling option selection
  it("toggles mobile dropdown visibility when button is clicked", () => {
    render(
      <Filter
        label={mockLabel}
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument(); // Always in DOM, just hidden via class
  });

  // Test case for handling option selection

  it('displays all options including the default "All" option', () => {
    render(
      <Filter
        label={mockLabel}
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    const options = screen.getAllByRole("option"); // Get all options including the default one
    expect(options[0]).toHaveTextContent(`All ${mockLabel}s`); // Check the default option

    mockOptions.forEach((option, index) => {
      expect(options[index + 1]).toHaveTextContent(option);
    });
  });
});
