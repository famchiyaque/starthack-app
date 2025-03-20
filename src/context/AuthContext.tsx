import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    name: string;
    setName: (email: string) => void;
    userType: string;
    setUserType: (userType: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState<string>("");
    const [userType, setUserType] = useState<string>("");

    return (
        <AuthContext.Provider value={{ name, setName, userType, setUserType }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
