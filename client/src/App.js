import './App.css'
import io from 'socket.io-client'
import React from 'react'

const socket = io("http://localhost:5000/")

function App() {
    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const [author, setAuthor] = React.useState('')

    const messagesListEl = React.useRef(null)
    
    React.useEffect(() => {
        socket.on('GET_MESSAGES', (message) => {
            setMessages(prevMessages => {
                return [...prevMessages, message]
            })
        })
    }, [])

    React.useEffect(() => {
        messagesListEl.current.scrollTo(0, 99999)
    }, [messages])
    
    const sendData = () => {
        const newMessage = {message, author}
        socket.emit('GET_MESSAGES', newMessage);
        setMessage('')
        setAuthor('')
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Chat application
                </p>
                <input type="text" onChange={e => setMessage(e.target.value)} value={message}/>
                <input type="text" onChange={e => setAuthor(e.target.value)} value={author}/>
                <button onClick={sendData}>Отправить</button>
                <hr/>
                <div ref={messagesListEl} style={{height: "400px", overflowY: "auto"}}>
                    {messages.map((e, index) => (
                        <div key={index}>
                            <div><b>{e.author}</b></div>
                            <hr/>
                            <div>{e.message}</div>
                            <br/>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
