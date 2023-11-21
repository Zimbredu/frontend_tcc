import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import stylesHeader from '../../components/Header/styles.module.scss'

import { canSSRAuth } from "../../utils/canSSRAuth";

import { setupAPIClient } from "../../services/api";

import { toast } from "react-toastify";

import Link from "next/link";



export default function OpenProject() {

    const [pTask, setTask] = useState(0);
    const [pName, setName] = useState('');

     const handleInputChangeToNumber = (e) => {
        const input = e.target.value;
        if (!isNaN(input)) {
            setTask(parseInt(input));
        }
    }; 

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        // alert(`You entered with: ${pTask} | ${pName}`)
        // console.log(typeof(pTask));

        try {
            if ( pTask === 0 ||  pName === '') {
                toast.error('Preencha todos os campos!');
                return;
            } else {

                const apiClient = setupAPIClient();
                await apiClient.post('/order', {
                    task: pTask,
                    name: pName,
                    draft: false
                });

                toast.success('Projeto aberto com sucesso!');
            }

        } catch (err) {
            console.log(err);
            toast.error('Erro ao abrir o projeto!')
        }
        setTask(0);
        setName('');
    }

    return (
        <>
            <Head>
                <title>Novo projeto - Taskify</title>
            </Head>
            <div>

                {/* Header */}
                <header className={stylesHeader.headerContainer}>
                    <div className={stylesHeader.headerContent}>
                        <Link href='/dashboard'>
                            <img src="/logoTaskify.png" width={180} height={35} alt="Taskify" />
                        </Link>

                        <nav className={stylesHeader.menuNav}>
                            <Link href='/' legacyBehavior>
                                <a className={styles.text}>Voltar</a>
                            </Link>
                        </nav>
                    </div>
                </header>
                {/* Fim Header */}

                <main className={styles.container}>
                    <h1>Novo projeto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="number"
                            placeholder="Digite o numero do projeto"
                            className={styles.input}
                            value={pTask}
                            onChange={handleInputChangeToNumber}
                        />

                        <input
                            type="text"
                            placeholder="Digite o nome do projeto"
                            className={styles.input}
                            value={pName}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className={styles.buttons}>
                            <button className={styles.buttonAdd} type="submit">
                                Abrir
                            </button>

                            <Link href='../tasks' legacyBehavior>
                                <a className={styles.buttonNext}>Adicionar tarefas</a>
                            </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    //    const apiClient = setupAPIClient(context);
    //    const response = await apiClient.post('/order');   
    //    console.log(response.data);

    return {
        props: {
            // ProjectProps: response.data
        }
    }
})