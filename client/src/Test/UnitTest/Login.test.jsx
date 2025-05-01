import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Login from "../../components/Login";
import { AuthContext } from "../../context/AuthContext";

// Mock external dependencies
jest.mock("axios");
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}));
jest.mock("../../components/Header", () => () => <div data-testid="header-mock">Header</div>);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("framer-motion", () => ({
  motion: {
    div: (props) => <div {...props} />, // Mock motion.div as a regular div
  },
  // Mock other framer-motion exports as needed
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mocking the AuthContext to provide a login function
describe("Login Component", () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  // Mocking the axios.post method to simulate API calls
  const renderComponent = () =>
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

  
// Test cases for the Login component
  test("updates form inputs when user types", async () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    fireEvent.change(emailInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await waitFor(() => {
      expect(emailInput).toHaveValue("testuser");
      expect(passwordInput).toHaveValue("password123");
    });
  });

  // Test case for successful login
  test("submits form and logs in successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "mock-token" } });

    renderComponent(); // Mock the component with AuthContext

    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Check if the axios.post method was called with the correct URL and data
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("mock-token");
      expect(toast.success).toHaveBeenCalledWith("Logged in successfully!");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    }, { timeout: 2000 });
  });

  // Test case for failed login
  test("shows error toast when form is submitted with empty fields", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please fill in all fields");
      expect(axios.post).not.toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});