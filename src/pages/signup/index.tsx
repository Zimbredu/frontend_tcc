import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/home.module.scss';
import logoImg from '../../../public/desenho4.svg';

import { Input } from "../../components/ui/Input";
import { Button } from '../../components/ui/Button';

/* O import a seguir é para nevegação de página */
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title> Faça seu cadastro agora </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo App" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>


          <form >
          <Input
              placeholder="Digite seu nome"
              type="text"
            />

            <Input
              placeholder="Digite seu email"
              type="text"
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
            />

            <Button type='submit'loading={false}>
              cadastrar
            </Button>
          </form>   

          {/* Precisei adicionar o atributo lagacyBehavior
          para a taga <a> funcionar dentro da tag <Link> */}        
          <Link href='/' legacyBehavior>
              <a className={styles.text}>Já possui uma conta? Faça o login!</a>
          </Link>
        </div>
      </div>

    </>

  )
}
