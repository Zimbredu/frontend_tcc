import { useState, FormEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";

import { setupAPIClient } from "../../services/api";

import { toast } from "react-toastify";

import { canSSRAuth } from "../../utils/canSSRAuth";

//import Link from "next/link";

//criando uma tipagem categoryList.
type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    //categoryList: ItemProps[];
    orderList: ItemProps[];
}

//export default function Tasks({ categoryList }: CategoryProps){
export default function Tasks({orderList}:CategoryProps){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //const [categories, setCategories] = useState(categoryList || []);
    const [categories, setCategories] = useState(orderList || []);
    const [categorySelected, setCategorySelected] = useState(0);

   
    //Função p/ selecionar um categoria/prioridade na lista (select).
    function handleChangeCategory(event){
       setCategorySelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {

            if(name === '' || description === ''){
                toast.error('Preencha todos os campos!');
                return;
            }
            
            const apiClient = setupAPIClient();

            await apiClient.post('/tasks', {
                name: name,
                description: description,
                categoria_tarefa_id:categories[categorySelected].id
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
                <title>Nova tarefa - Taskify</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Nova tarefa</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                       
                        <select value={categorySelected} onChange={handleChangeCategory}>
                           {categories.map( (item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                      {item.name}                                        
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

                        <div className={styles.buttons}>
                       <button className={styles.buttonAdd} type="submit">
                         Cadastrar
                       </button>

                      {/*  <Link href='../addtaskproject' legacyBehavior>
                            <a className={styles.buttonNext}>Adicionar tarefas em um projeto</a>
                        </Link> */}
                        </div>

                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(context) => {
   const apiClient = setupAPIClient(context);

   
   /*  const response = await apiClient.get('/category');   */
   const response = await apiClient.get('/orders');  
    // console.log(response.data);


    return{
        props:{
            /* categoryList: response.data */
            orderList: response.data,
        }
    }
})