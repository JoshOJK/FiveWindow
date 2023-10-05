import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { io } from 'socket.io-client';


const Chat = () => {
    const user = useSelector(state => state.session.user)
    const [chatInput, setChatInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        //create websocket/connect
        socket = io();

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user: user.username, msg: chatInput });
        // clear the input field after the message is sent
        setChatInput("")
    }



    return ( user && (
        <div>
        <div>
            {messages.map((message, ind) => (
                <div key={ind}>{`${message.user}: ${message.msg}`}</div>
            ))}
        </div>
        <form onSubmit={sendChat}>
    <input
        value={chatInput}
        onChange={updateChatInput}
    />
    <button type="submit">Send</button>
</form>
</div>
    )
    )
};

    export default Chat;
