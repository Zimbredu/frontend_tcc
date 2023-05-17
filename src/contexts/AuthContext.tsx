
import { createContext, experimental_useOptimistic, ReactNode, useState } from "react";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){ 
    const [user, setUser] = useState<UserProps>()

    /* Convertendo a variável !!user em booleano 
     Se a variável user estiver vazia converte p/ falso
     senão true. */
    const isAuthenticated = !!user;

   async function signIn({email, password}: SignInProps){
        console.log('DADOS PARA LOGAGR', experimental_useOptimistic);
        console.log('SENHA', password);
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}