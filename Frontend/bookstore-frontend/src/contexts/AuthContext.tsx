import {
    createContext,
    useContext,
    useState,
} from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    roles: string[];

    login: (
        token: string,
        roles: string[]
    ) => void;

    logout: () => void;
};

const AuthContext =
    createContext<AuthContextType | null>(
        null
    );

export const AuthProvider = ({
                                 children,
                             }: {
    children: React.ReactNode;
}) => {
    const [isAuthenticated, setIsAuthenticated] =
        useState(
            !!localStorage.getItem("token")
        );

    const [roles, setRoles] = useState<
        string[]
    >(
        JSON.parse(
            localStorage.getItem("roles") ||
            "[]"
        )
    );

    const login = (
        token: string,
        roles: string[]
    ) => {
        localStorage.setItem("token", token);

        localStorage.setItem(
            "roles",
            JSON.stringify(roles)
        );

        setIsAuthenticated(true);

        setRoles(roles);
    };

    const logout = () => {
        localStorage.removeItem("token");

        localStorage.removeItem("roles");

        setIsAuthenticated(false);

        setRoles([]);
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
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
};