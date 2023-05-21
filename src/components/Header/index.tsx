import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext';

export function Header(){

    const{ signOut } = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
           <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src="/logo_.svg" width={190} height={60} alt="imagem do logo." />                
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/categoriaServico' legacyBehavior>
                       <a>Índice</a>                   
                    </Link>

                    <Link href='/servico' legacyBehavior>
                       <a>Tarefa</a>                    
                    </Link>
                    
                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24}/>
                    </button>
                </nav>

           </div>
        </header>

    )
}