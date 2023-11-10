import { useState, FormEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";
import Link from 'next/link';

import { setupAPIClient } from "../../services/api";

import { toast } from "react-toastify";
import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

import { canSSRAuth } from "../../utils/canSSRAuth";


// type ItemProps = {
//     id: string;
//     name: string;
// }

// interface CategoryProps{
//     categoryList: ItemProps[];
// }

type ProjectProps = {
    id: string;
    task: number;
    name: string;
}

type TaskProps = {
    id: string;
    name: string;
    description: string;
}

interface ListProps {
    projectsList: ProjectProps[];
    tasksList: TaskProps[];
}

export default function Tasks({ /*categoryList*/ projectsList, tasksList }: ListProps) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // const [categories, setCategories] = useState(categoryList || []);
    const [projects, setProject] = useState(projectsList || []);
    const [tasks, setTask] = useState(tasksList || []);
    // const [categorySelected, setCategorySelected] = useState(0);
    const [projectSelected, setProjectSelected] = useState(0);
    const [taskSelected, setTaskSelected] = useState(0);


    //Função p/ selecionar um categoria/prioridade na lista (select).
    // function handleChangeCategory(event){
    //    setCategorySelected(event.target.value);
    // }
    function handleChangeProject(event) {
        setProjectSelected(event.target.value);
    }
    function handleChangeTask(event) {
        setTaskSelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {

            // if(name === '' || description === ''){
            //     toast.error('Preencha todos os campos!');
            //     return;
            // }

            const apiClient = setupAPIClient();

            await apiClient.post('/order/add', {
                requisicao_tarefa_id: projects[projectSelected].id,
                tarefa_id: tasks[taskSelected].id
            });

            toast.success('Tarefa inserida no projeto com sucesso!');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao inserir tarefa!')
        }
        setName('');
        setDescription('');
    }

    return (
        <>
            <Head>
                <title>Inserir tarefa - Taskify</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Adicione tarefas ao projeto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        {/* Select order */}
                        <h3>Selecione o projeto:</h3>
                        <select value={projectSelected} onChange={handleChangeProject}>
                            {projects.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        {/* Select tarefa */}
                        <h3>Selecione a tarefa:</h3>
                        <select value={taskSelected} onChange={handleChangeTask}>
                            {tasks.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <div className={styles.buttons}>
                            <button className={styles.buttonAdd} type="submit">
                                <IoMdAddCircle className={styles.addIcon}/><span>Adicionar</span>
                            </button>

                            <Link href='/dashboard' legacyBehavior>
                                <button className={styles.buttonHome}>
                                    <AiFillHome size={33} color="#1D1D2E"></AiFillHome>
                                </button>
                            </Link>
                        </div>

                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);


    // const response = await apiClient.get('/category');
    const responseProject = await apiClient.get('/orders');
    const responseTasks = await apiClient.get('/all/tasks');
    // console.log(response.data);


    return {
        props: {
            // categoryList: response.data
            projectsList: responseProject.data,
            tasksList: responseTasks.data
        }
    }
})