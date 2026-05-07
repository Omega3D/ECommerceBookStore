import {
    createContext,
    useContext,
    useState,
} from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    roles: string | null;

    login: (token: string, roles: string[]) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(
    null
);

export const AuthProvider = ({
                                 children,
                             }: {
    children: React.ReactNode;
}) => {
    const [isAuthenticated, setIsAuthenticated] =
        useState(!!localStorage.getItem("token"));

    const [roles, setRoles] = useState<string | null>(
        localStorage.getItem("roles")
    );

    const login = (token: string, roles: string[]) => {
        localStorage.setItem("token", token);
        localStorage.setItem("roles", roles[0]);

        setIsAuthenticated(true);
        setRoles(roles[0]);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");

        setIsAuthenticated(false);
        setRoles(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                roles,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
};