import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import './ChatPrevisualizacion.css';
import { Link } from 'react-router-dom'; // Importación de Link para navegación

function ChatPrevisualizacion({ nombre, mensaje, timestamp, imgPerfil }) {
    return (
        <Link to={`/chat/${nombre}`} className="chatPrevisualizacion">
            <div className="chatPrevisualizacion__contenedor">
                <AccountBoxIcon className="chatPrevisualizacion__imagen" alt={nombre} src={imgPerfil} />
                <div className="chatPrevisualizacion__detalles">
                    <h2>{nombre}</h2>
                    <p>{mensaje}</p>
                </div>
                <p className="chatPrevisualizacion__timestamp">{timestamp}</p>
            </div>
        </Link>
    );
}

export default ChatPrevisualizacion;
