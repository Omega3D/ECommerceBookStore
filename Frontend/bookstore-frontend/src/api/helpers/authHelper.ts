export const saveAuth = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getRole = () => {
    return localStorage.getItem("role");
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};