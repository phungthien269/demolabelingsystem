import * as React from "react";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (role) => {
        // Mock login delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: "u1",
                    name: "Demo User",
                    role: role,
                    avatar: "https://ui-avatars.com/api/?name=Demo+User&background=ramdom",
                };
                setUser(mockUser);
                localStorage.setItem("user", JSON.stringify(mockUser));
                resolve(mockUser);
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
