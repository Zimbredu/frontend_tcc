import React, { useState } from "react";
//import reactLogo from './assets/react.svg';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react';
//import { canSSRAuth } from "../../utils/canSSRAuth";

const API_KEY = "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";

export default function Chat() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Olá, faça sua pesquisa...",
            sender: "ChatGPT"
        }
    ])// []

    const handleSend = async (message) => {
        const newMessage = {
            message:message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage]; // todas as mensagens antigas, + a nova mensagem

        // atualiza o estado da messagem
        setMessages(newMessages);

        // definir um indicador de digitação (chatgpt está digitando)
        setTyping(true);
        // processar mensagem para chatGPT (envie e veja a resposta)
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages){
        // chatMassages { sender: "user" or "ChatGPT", message: "The message content here"}
        // apiMessages { role: "user" or "assistant", consten: "The message content here"}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if(messageObject.sender === "ChatGPT"){
                role = "assistant"
            } else{
                role = "user"
            }
            return { role: role, content: messageObject.message }
        });

        // função "usuário" -> uma mensagem do usuário, "assistente" -> uma resposta do chaGPT
        // "sistema" -> geralmente uma mensagem inicial definindo COMO queremos que o chatgpt fale
        let horas = 84000;
        const systemMessage = {
            role: "system",
             //content: "Extraia o tempo no formato { tempo: 00:00 } da seguinte frase" 
               content: "prazo, minutos, horas, condições, exemplos de, explique o que é"
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages":[
                systemMessage,
                ...apiMessages // [messagem1, messagem2, messagem3]
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers:{
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            console.log(data.choices[0].message.content);
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            );
            setTyping(false);
        })
    }


    return (
        <div>
            <div style={{ position: "relative", height: "570px", width: "800px"}}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                        scrollBehavior='smooth'
                         typingIndicator={ typing ? <TypingIndicator content="ChatGPT está digitando"/> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message}/>
                            })}
                        </MessageList>
                        <MessageInput placeholder='Type message here' onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer> 

            </div>
        </div>
    );
    //}

}

/* export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
}) */