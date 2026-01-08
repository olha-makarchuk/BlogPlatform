import { createContext, useState } from "react";

const AuthContext = createContext(null);

const getInitialAuthState = () => {
  try {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) {
      return { user: null, isAuthenticated: false };
    }
    return JSON.parse(storedAuth);
  } catch {
    return { user: null, isAuthenticated: false };
  }
};

const AuthProvider = ({ children }) => {
  const initialAuth = getInitialAuthState();

  const [user, setUser] = useState(initialAuth.user);
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAuth.isAuthenticated
  );

  const login = () => {
    const mockUser = {
      id: 1,
      name: "Олександр Коваленко",
      email: "alex@example.com",
      avatar: "https://i.pravatar.cc/150?img=1"
    };

    setUser(mockUser);
    setIsAuthenticated(true);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user: mockUser,
        isAuthenticated: true,
      })
    );
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user: updatedUser,
        isAuthenticated: true,
      })
    );
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
