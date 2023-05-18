//Este é o arquivo que permite que usuário não logado(visitantes) tenham acesso.
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import { parseCookies } from 'nookies';

//Função para página que só pode ser acessadas por visitantes.
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async(context:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);
        
        //Se um visitante tentar acessar a página tendo um login salvo será rederecionado.
        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }
        return await fn(context);
    }
}