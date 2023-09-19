import React, { useState } from 'react';


import axios from 'axios';
import Head from 'next/head';
import styles from './styles.module.scss'
import { canSSRAuth } from '../../utils/canSSRAuth';
import Link from 'next/link';

export default function Chat() {
    const [response, setResponse] = useState('');

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
                <title>Chat</title>
            </Head>
            <main className={styles.container}>
                <div>
                    <h1>Faça sua pesquisa</h1>

                    <textarea
                        readOnly
                        className={styles.answer}
                        value={response}
                    >
                    </textarea>

                    <textarea
                        className={styles.text}
                        placeholder='pergunte algo...'
                        onKeyDown={(e) => handleSubmit(e)}
                    >
                    </textarea>
                </div>
            

            <Link href="/dashboard" legacyBehavior>
                <a className={styles.textLink}> Sair </a>
            </Link>
        </main >
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
});
