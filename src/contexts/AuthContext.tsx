
import { createContext, ReactNode, useState } from "react";

import { destroyCookie } from "nookies";
import  Router from 'next/router';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
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

export const AuthContext = createContext({} as AuthContextData);

//Inicio funcionalidade de logout.
export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/')
    }catch{
        console.log('Erro ao deslogar.')
    }
}
//Fim da funcionalidade de logout.

export function AuthProvider({ children }: AuthProviderProps){ 
    const [user, setUser] = useState<UserProps>()

    /* Convertendo a variável !!user em booleano 
     Se a variável user estiver vazia converte p/ falso
     senão true. */
    const isAuthenticated = !!user;

   async function signIn({email, password}: SignInProps){
        console.log('DADOS PARA LOGAGR', email);
        console.log('SENHA', password);
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}