import { UserCredentials } from "@/types/user-credentials";
import React, { useState, createContext, PropsWithChildren } from "react";

type AuthContextType = {
    auth: UserCredentials;
    setAuth: React.Dispatch<React.SetStateAction<UserCredentials>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<UserCredentials>({} as UserCredentials);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;