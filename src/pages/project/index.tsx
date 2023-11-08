import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import stylesHeader from '../../components/Header/styles.module.scss'

import { canSSRAuth } from "../../utils/canSSRAuth";

import { setupAPIClient } from "../../services/api";

import { toast } from "react-toastify";

import Link from "next/link";

type OrderProps = {
    task: number;
    name: string;
}

export default function OpenProject(/*{ task, name }: OrderProps*/){

    const [pTask, setTask] = useState(0);
    const [pName, setName] = useState('');

    //const [avatarUrl, setAvatarUrl] = useState('');
   //const [imageAvatar, setImageAvatar] = useState(null);

    // const [prioridades, setPrioridades] = useState(prioridadeList || []);
    const [prioridadeSelected, setPrioridadeSelected] = useState(0);


    // function handleChangeToInt(event){
    //     let strToInt = 0

    //     strToInt = parseInt(event.target.value);
    //     setTask(event.target.value);
    //  }


    const handleInputChangeToNumber = (e) => {
        const input = e.target.value;
        if (!isNaN(input)) {
            setTask(parseInt(input));
        }
    };

   /*  function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        } 
        const image = e.target.files[0];

        if(!image){
            return;
        }
        if(image.type === 'image/jpeg' || image.type === 'image/png'){

            //setImageAvatar(image);
            //setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    } */

    //Ao selecionar uma nova categoria na lista.
    // function handleChangePrioridade(event){
    //    setPrioridadeSelected(event.target.value);
    // }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        alert(`You entered with: ${pTask} | ${pName}`)
        console.log(typeof(pTask));

        try {
            if(pTask === 0 /*|| name === ''*/){
                toast.error('Preencha todos os campos!');
                return;
            }else{

            const apiClient = setupAPIClient();
            await apiClient.post('/order', {
                task: pTask,
                name: pName,
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

    return(
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
                       {/* 
                       <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF"/>
                            </span>
                                <input type="file" accept="image/png, image/jpe" onChange={handleFile}/>

                                {avatarUrl && (
                                    <img 
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto da tarefa"
                                    width={250}
                                    height={250}
                                  />
                                )}
                       </label> */}

                        {/* <select value={prioridadeSelected} onChange={handleChangePrioridade}>
                           {prioridades.map( (item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                      {item.prioridade}                                        
                                    </option>
                                )
                           })}
                        </select> */}
                        
                       <input
                        type="number"
                        placeholder="Digite o numero do projeto"
                        className={styles.input}
                        value={pTask}
                        // onChange={ (e) => setTask(e.target.value)}
                        onChange={handleInputChangeToNumber}
                       />

                       <input
                         type="text"
                         placeholder="Digite o nome do projeto"
                         className={styles.input}
                         value={pName} 
                         onChange={ (e) => setName(e.target.value)} 
                         />

                       <button className={styles.buttonAdd} type="submit">
                         Abrir
                       </button>
                       
                        <Link href='../tasks' legacyBehavior>
                            <a className={styles.text}>Adicionar tarefas</a>
                        </Link>
                         
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(context) => {
//    const apiClient = setupAPIClient(context);

//    const response = await apiClient.post('/order');   
//    console.log(response.data);


    return{
        props:{
            // ProjectProps: response.data
        }
    }
})