import Head from "next/head";
import Image from "next/image";
import styles from '../styles/home.module.scss';
import logoImg from '../../public/desenho4.svg';

import { Input } from "../components/ui/Input";
import { Button} from '../components/ui/Button';


export default function Home() {
  return (
   <>

    <Head>
      <title>Usuário - Faça seu login </title>
    </Head>
    <div className={styles.containerCenter}>
     <Image src={logoImg} alt="Logo App"/>

      <div className={styles.login}>
          <form action="">
          <Input
              placeholder="Digite seu email"
              type="text"
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
            />

            <Button type='submit'
              loading={false}>
                 Acessar
            </Button>
          </form>
      </div>
    </div>

   </>

  )
}
