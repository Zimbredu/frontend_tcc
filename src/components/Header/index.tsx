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
                    <img src="/logoTaskify.png" width={180} height={35} alt="Logo" />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/category' legacyBehavior>
                       <a>Cadastrar tarefa</a>                   
                    </Link>

                    <Link href='/tasks' legacyBehavior>
                       <a>Tarefas</a>                    
                    </Link>
                    
                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24}/>
                    </button>
                </nav>

           </div>
        </header>

    )
}