import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
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

// Mock Header component
jest.mock("../../components/Header", () => () => (
  <div data-testid="header-mock">Header</div>
));

// Enhanced Framer Motion mock
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => {
      // Filter out Framer Motion specific props
      const filteredProps = Object.keys(props).reduce((acc, key) => {
        if (
          !key.startsWith("animate") &&
          !key.startsWith("initial") &&
          !key.startsWith("exit") &&
          key !== "whileInView" &&
          key !== "viewport"
        ) {
          acc[key] = props[key];
        }
        return acc;
      }, {});
      return <div {...filteredProps}>{children}</div>;
    },
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component Integration Tests", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const AuthContextProvider = ({ children }) => (
    <AuthContext.Provider
      value={{ user: null, login: mockLogin, logout: jest.fn() }}
    >
      {children}
    </AuthContext.Provider>
  );

  // Test for successful login
  test("shows error when submitting with empty fields", async () => {
    render(
      <AuthContextProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Check if the error toast is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please fill in all fields");
      expect(axios.post).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
