import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

import { setupAPIClient } from "../../services/api";

import { toast } from "react-toastify";

//criando uma tipagem categoryList.
type ProjectProps = {
    id: string;
    task: string | number;
    name: string | null;
}


export default function OpenProject({ task, name }: ProjectProps){

    const [projectTask, setProjectTask] = useState('');
    const [projectName, setProjectName] = useState('');

    //const [avatarUrl, setAvatarUrl] = useState('');
   //const [imageAvatar, setImageAvatar] = useState(null);

    // const [prioridades, setPrioridades] = useState(prioridadeList || []);
    const [prioridadeSelected, setPrioridadeSelected] = useState(0);

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
    function handleChangePrioridade(event){
       setPrioridadeSelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            // const data = new FormData();

            if(projectTask === '' || projectName === ''){
                toast.error('Preencha todos os campos!');
                return;
            }
            // data.append('name', name);
            // data.append('description', description);
            // data.append('prioridade_id', prioridades[prioridadeSelected].id);
           // data.append('catergoria_tarefa_id', categories[categorySelected].id);
           // data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/order', {
                task: projectTask,
                name: projectName,
            });

            toast.success('Projeto aberto com sucesso!');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao abrir o projeto!')
        }
        setProjectTask('');
        setProjectName('');
    }

    return(
        <>
            <Head>
                <title>Novo projeto - Taskify</title>
            </Head>
            <div>
                <Header/>
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
                        value={projectTask}
                        onChange={ (e) => setProjectTask(e.target.value)}
                       />

                       <input
                         type="text"
                         placeholder="Digite o nome do projeto"
                         className={styles.input}
                         value={projectName} 
                         onChange={ (e) => setProjectName(e.target.value)} 
                         />

                       <button className={styles.buttonAdd} type="submit">
                         Abrir
                       </button>

                      
                         
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