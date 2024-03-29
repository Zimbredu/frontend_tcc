import { useState } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import styles from './styles.module.scss';

import { Header } from "../../components/Header";
import { FiRefreshCcw } from "react-icons/fi";

import { setupAPIClient } from '../../services/api';

import { ModalOrder } from '../../components/ModalOrder';
import { toast } from "react-toastify";

import Link from "next/link";
import Modal from 'react-modal';

type OrderProps = {
    id: string;
    task: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    requisicao_tarefa_id: string;
    tarefa_id: string;
    tarefa: {//product
        id: string;
        name: string;
        description: string
    }
    requisicaotarefas: {//order
        id: string;
        task: string | number;
        status: boolean;
        name: string;
    }
}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {

        const apiClient = setupAPIClient();

        const response = await apiClient.get('/order/detail', {
            params: {
                requisicao_tarefa_id: id,
            }
        });
        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishItem(id: string) {
        const apiClient = setupAPIClient();

        try {

            if (id === null) {
                toast.error('Preencha todos os campos!');
                return;
            }
            
            await apiClient.put('/order/finish', {
                requisicao_tarefa_id: id,
            })

            //Buscar todas as tarefas.
            const response = await apiClient.get('/orders');
            //Listar os últimos pedidos atualizados.
            setOrderList(response.data);
            //Fechar o modal.
            setModalVisible(false);
            toast.success('Projeto concluído com sucesso!');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao concluir o projeto!')
        }

    }
    //Atualizar lista com botão (FiRefreshCcw buscar os últimos pedidos). 
    async function handleRefreshOrders() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/orders');
        setOrderList(response.data);
    }

    Modal.setAppElement('#__next');





    return (
        <>
            <Head>
                <title>Dashboard - Taskify</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Projects Dashboard</h1>
                        <button onClick={handleRefreshOrders}>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>
                    </div>



                    <article className={styles.listOrders}>

                        {orderList.length == 0 && (
                            <span className={styles.emptyList}>
                                Lista de projetos/atividades vazia...
                            </span>
                        )}

                        {orderList.map(item => (
                            <section key={item.id} className={styles.orderItem}>
                                <div className={styles.tag}></div>
                                <div className={styles.card}>
                                    <button onClick={() => handleOpenModalView(item.id)}>

                                        <span className={styles.project}>Projeto {item.task}</span>

                                        <span className={styles.details}>Detalhes</span>
                                    </button>
                                </div>
                            </section>
                        ))}


                    </article>

                    <Link href='../concludeprojects' legacyBehavior>
                        <button className={styles.buttonConcludeOrders}>
                            <span>Projetos Concluídos</span>
                        </button>
                    </Link>

                </main>

                {modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        requisicaotarefas={modalItem}
                        handleFinishOrder={handleFinishItem}
                    />
                )}

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);

    const response = await apiClient.get('/orders');
    //Com console a seguir é possível visualizar as requisicões no bash/cmd.
    // console.log(response.data); 

    return {
        props: {
            orders: response.data
        }
    }
})
