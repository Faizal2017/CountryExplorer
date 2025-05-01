import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";

// Create a mock provider component
const MockAuthProvider = ({ children, value }) => {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom render function with auth context
const renderWithAuth = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <MemoryRouter>
      <MockAuthProvider {...providerProps}>
        {ui}
      </MockAuthProvider>
    </MemoryRouter>,
    renderOptions
  );
};

// Mocking the Header component to avoid unnecessary complexity in tests
describe("Header Component", () => {
  const mockUser = {
    username: "testuser",
    token: "testtoken"
  };

  // Mocking the AuthContext to provide a user object and logout function
  it("shows login and register buttons when user is not logged in", () => {
    const providerProps = {
      value: {
        user: null,
        logout: jest.fn()
      }
    };
    
    // Render the Header component with the mock provider
    renderWithAuth(<Header />, { providerProps });
    
    // Check if the login and register buttons are present
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();
  });

  // Test case for when the user is logged in
  it("shows user info and logout button when user is logged in", () => {
    const providerProps = {
      value: {
        user: mockUser,
        logout: jest.fn()
      }
    };
    
    // Render the Header component with the mock provider
    renderWithAuth(<Header />, { providerProps });
    
    // Check if the user info and logout button are present
    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  // Test case for logout functionality
  it("calls logout function when logout button is clicked", () => {
    const mockLogout = jest.fn();
    const providerProps = {
      value: {
        user: mockUser,
        logout: mockLogout
      }
    };
    
    // Render the Header component with the mock provider
    renderWithAuth(<Header />, { providerProps });
    fireEvent.click(screen.getByText("Logout"));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

});