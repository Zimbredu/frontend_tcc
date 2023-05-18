
import { createContext, ReactNode, useState } from "react";

import { api } from '../services/apiClient'

import { destroyCookie, setCookie, parseCookies } from "nookies";
import  Router from 'next/router';

import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

//Início funcionalidade de logout.
export function signOut(){
    try{
        //@nextauth.token é nome cookie.
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

   //Início funcionalidade login. 
   async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/login',{
                email,
                password
            })
            //console.log(response.data);

            const { id, name, token} = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //O token é válido por um mês.
                path: '/' //Caminhos/rotas que terão acesso ao cookie.
            })

            setUser({
                id,
                name,
                email,
            })

            //Passar para as próximas requisições o nosso token.
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            //Alert personalizado.
            toast.success('Logado com sucesso!');

            //Redirecionar o user para /dashboard(página dos últimos serviços/tarefa)
            Router.push('/dashboard');


        } catch (erro) {
            toast.error('Erro ao acessar!')
            console.log('ERRO AO ACESSAR', erro);
        }
   }

   async function signUp({name, email, password}: SignUpProps){
    try {
        const response = await api.post('/users', {
            name, 
            email,
            password
        })
        
        //Alert personalizado.
        toast.success('Conta criada com sucesso!');

        Router.push('/');

    } catch (err) {
        toast.error('Erro ao cadastrar!')
        console.log('Erro ao cadastrar', err);
    }
}

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}