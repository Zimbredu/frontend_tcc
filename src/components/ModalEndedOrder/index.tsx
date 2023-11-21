
import Modal from "react-modal";
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard';

import Link from "next/link";

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    /* requisicaoservico: OrderItemProps[]; */
    requisicaotarefas: OrderItemProps[];
    handleRevertOrder: (id: string) => void;
}

export function ModalEndedOrder({ isOpen, onRequestClose, requisicaotarefas, handleRevertOrder }: ModalOrderProps) {
    //A seguir a configuração do Modal.
    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1D1D2E'
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color='#f34748' />
            </button>

            <div className={styles.container}>

                <div className={styles.containerHeader}>
                    <h2>Detalhes do projeto</h2>

                    {requisicaotarefas.length == 0 && (
                        <span className={styles.emptyList}>
                            Lista de tarefas/atividades vazia...
                        </span>
                    )}

                    {requisicaotarefas.length > 0 && (
                        <>
                            <span className={styles.project}>
                                Projeto: {requisicaotarefas[0].requisicaotarefas.task}
                            </span>
                            <span className={styles.projectName}>
                                {requisicaotarefas[0].requisicaotarefas.name}
                            </span>
                        </>
                    )}

                </div>

                {requisicaotarefas.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.tarefa.name}</strong></span>
                        <span className={styles.description}>{item.tarefa.description}</span>
                    </section>
                ))}

                <div className={styles.containerButtons}>
                    <button className={styles.buttonOrder} onClick={() =>
                        handleRevertOrder(requisicaotarefas[0].requisicao_tarefa_id)}>
                        Continuar projeto
                    </button>

                    <button className={styles.buttonLink}>
                        <a href="/chat" className={styles.textLink}> Chat </a>
                    </button>

                </div>

            </div>

        </Modal>
    )
}