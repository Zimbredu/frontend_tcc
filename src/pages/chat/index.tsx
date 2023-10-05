import React, { useState, useContext } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { AuthContext } from '../../contexts/AuthContext';
import stylesChat from './styles.module.scss'
import stylesHeader from '../../components/Header/styles.module.scss'

import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function Chat() {
    const [response, setResponse] = useState('');
    const{ signOut } = useContext(AuthContext);

    const handleSubmit = (e) => {
        const apiKey = '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';
        if (e.keyCode === 13 && e.shiftKey === false) {
            const client = axios.create({
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            const params = {
                model: "text-davinci-003",
                prompt: e.target.value,
                max_tokens: 56,
                temperature: 0.3,
            };

            client
                .post('https://api.openai.com/v1/completions', params)
                .then((result) => setResponse(result.data.choices[0].text))
                .catch((err) => console.log(err))
        }
    };

    return (
        <>
            <Head>
                <title>Chat - Taskify</title>
            </Head>

            <div>

                {/* Header */}
                <header className={stylesHeader.headerContainer}>
                    <div className={stylesHeader.headerContent}>
                        <Link href='/dashboard'>
                            <img src="/logoTaskify.png" width={180} height={35} alt="Taskify" />
                        </Link>

                        <nav className={stylesHeader.menuNav}>
                            <button onClick={signOut}>
                                <FiLogOut color='#FFF' size={24}/>
                            </button>
                        </nav>
                    </div>
                </header>
                {/* Fim Header */}



                {/* Container */}
                <main className={stylesChat.container}>
                    <div className={stylesChat.containerChat}>
                        <h1>Faça sua pesquisa</h1>

                        <textarea
                            className={stylesChat.question}
                            placeholder='Pergunte algo...'
                            onKeyDown={(e) => handleSubmit(e)}
                        >
                        </textarea>

                        <textarea
                            readOnly
                            className={stylesChat.answer}
                            value={response}
                        >
                        </textarea>


                        <Link href="/dashboard" legacyBehavior>
                            <button className={stylesChat.returnButton}>
                                <AiOutlineArrowLeft className={stylesChat.iconButton} size={35} color="#1D1D2E" />
                                <span>Voltar</span>
                            </button>
                        </Link>
                    </div>

                </main>
                {/* Fim Container */}

            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
});
