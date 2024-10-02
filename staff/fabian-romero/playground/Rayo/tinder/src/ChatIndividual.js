import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import './ChatIndividual.css';

function ChatIndividual() {
    const [input, setInput] = useState("");
    const [mensajes, setMensajes] = useState([
        {
            nombre: "María",
            imagen: "...",
            mensaje: "heyy"
        },
        {
            nombre: "María",
            imagen: "...",
            mensaje: "Estás ahí????? RESPONDEEEEEEEE"
        },
        {
            mensaje: 'holaaa perdon perdon ya estoyyy'
        }
    ]);

    const adminEnvio = (e) => {
        e.preventDefault();
        setMensajes([...mensajes, { mensaje: input }]);
        setInput("");
    }

    return (
        <div className="chatIndividual">
            <p className="chatIndividual__timestamp">CONSEGUISTE UN MATCH EL 19/1/21</p>
            {mensajes.map((mensaje, index) => (
                mensaje.nombre ? (
                    <div key={index} className="chatIndividual__mensaje">
                        <AccountBoxIcon className="chatIndividual__avatar"
                            alt={mensaje.nombre}
                            src={mensaje.imagen} />
                        <p className="chatIndividual__mensaje__texto">{mensaje.mensaje}</p>
                    </div>
                ) : (
                    <div key={index} className="chatIndividual__mensaje">
                        <p className="chatIndividual__mensaje__propio">{mensaje.mensaje}</p>
                    </div>
                )
            ))}

            <form className="chatIndividual__input" onSubmit={adminEnvio}>
                <input
                    className="chatIndividual__input__input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button
                    type="submit"
                    className="chatIndividual__input__send"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default ChatIndividual;
