import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError} from './errors/AuthTokenError';

import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(context = undefined){
    let cookies = parseCookies(context);

    const api = axios.create({
         baseURL: 'http://localhost:3333', 
      // baseURL: 'http://localhost:3001',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    //A seguir a configuração caso a API dê algum erro.
    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            //Qualquer erro 401 (não autorizado) devemos deslogar o usuário.
            if(typeof window !== undefined){
                //Chamar a função para deslogar o usuário.
                signOut();
            }else{
                return Promise.reject(new AuthTokenError());
            }
        }

        return Promise.reject(error)

    })

    return api;
}
