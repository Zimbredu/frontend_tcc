/* Página de login */

import { useContext, FormEvent, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from '../styles/home.module.scss';
import logoProjeto from '../../public/logoTaskify.png';


import { Input } from "../components/ui/Input";
import { Button } from '../components/ui/Button';
import { toast } from "react-toastify";


import { AuthContext } from "../contexts/AuthContext";

import { canSSRGuest } from "../utils/canSSRGuest";

/* O import a seguir é para nevegação de página */
import Link from "next/link";


export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === '') {
       //Alert personalizado.
       toast.error('Preencha todo os campos!');

      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }
   await signIn(data);

   setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoProjeto} alt="Logo App" className={styles.logo} />

        <div className={styles.login}>
          <h1>Entrar</h1>

          <form onSubmit={handleLogin} >
            <Input
              placeholder="Digite seu email..."
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit'
              loading={loading}
            >
              Acessar
            </Button>
          </form>   

          {/* Precisei adicionar o atributo lagacyBehavior
          para a taga <a> funcionar dentro da tag <Link> */}        
          <Link href='/signup' legacyBehavior>
              <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
          </Link>
        </div>
      </div>
    </>

  )
}

export const getServerSideProps = canSSRGuest(async (context) => {

  return{
    props:{}
  }
})

