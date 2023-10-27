import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from 'react-icons/fi';

import { setupAPIClient } from "../../services/api";

import { toast } from "react-toastify";

//criando uma tipagem categoryList.
type ItemProps = {
    id: string;
    name: string;
    prioridade: number;
}

interface CategoryProps{
    prioridadeList: ItemProps[];
}

export default function Tasks({ prioridadeList }: CategoryProps){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //const [avatarUrl, setAvatarUrl] = useState('');
   //const [imageAvatar, setImageAvatar] = useState(null);

    const [prioridades, setPrioridades] = useState(prioridadeList || []);
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
            const data = new FormData();

            if(name === '' || description === ''){
                toast.error('Preencha todos os campos!');
                return;
            }
            // data.append('name', name);
            // data.append('description', description);
            // data.append('prioridade_id', prioridades[prioridadeSelected].id);
           // data.append('catergoria_tarefa_id', categories[categorySelected].id);
           // data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/tasks', {
                name: name,
                description: description,
                prioridade_id:prioridades[prioridadeSelected].id
            });

            toast.success('Tarefa cadastrada com sucesso!');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao cadastrar tarefa!')
        }
        setName('');
        setDescription('');
    }

    return(
        <>
            <Head>
                <title>Nova tarefa - Optimize Tasks</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Nova tarefa</h1>

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

                        <select value={prioridadeSelected} onChange={handleChangePrioridade}>
                           {prioridades.map( (item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                      {item.prioridade}                                        
                                    </option>
                                )
                           })}
                        </select>
                        
                       <input
                         type="text"
                         placeholder="Digite o nome da tarefa."
                         className={styles.input}
                         value={name} 
                         onChange={ (e) => setName(e.target.value)} 
                         />

                       <textarea
                         placeholder="Descreva sua tarefa"
                         className={styles.input}
                         value={description}
                         onChange={ (e) => setDescription(e.target.value)}
                       />

                       <button className={styles.buttonAdd} type="submit">
                         Cadastrar
                       </button>

                      
                         
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(context) => {
   const apiClient = setupAPIClient(context);

   const response = await apiClient.get('/category');   
   /* console.log(response.data); */


    return{
        props:{
            prioridadeList: response.data
        }
    }
})