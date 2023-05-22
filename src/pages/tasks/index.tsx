import { useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from 'react-icons/fi'

export default function Tasks(){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        } 
        const image = e.target.files[0];

        if(!image){
            return;
        }
        if(image.type === 'image/jpeg' || image.type === 'image/png'){

            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
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

                    <form className={styles.form}>
                       
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
                       </label>

                        <select >
                            <option >
                               Engenharia de software
                            </option>
                            <option >
                               Desenvolvimento de software
                            </option>
                        </select>
                        
                       <input
                         type="text"
                         placeholder="Digite o nome da tarefa."
                         className={styles.input}
                         />

                       <textarea
                         placeholder="Descreva sua tarefa"
                         className={styles.input}
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
    return{
        props:{}
    }
})