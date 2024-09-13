import React from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';  // Actualización a @mui/icons-material
import ChatIcon from '@mui/icons-material/Chat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';    // Actualización a @mui/material
import { Link, useNavigate } from 'react-router-dom'; // Sustitución de useHistory por useNavigate

function Header({ botonRetroceder }) {
    const navigate = useNavigate();  // Uso de useNavigate en lugar de useHistory

    return (
        <div className="header">
            {botonRetroceder ? (
                <IconButton onClick={() => navigate(botonRetroceder)} >
                    <ArrowBackIcon fontSize="large" className="header__botonRetroceder" />
                </IconButton>
            ) : (
                <IconButton>
                    <PersonIcon className="header__icon" fontSize="large" />
                </IconButton>
            )}

            <Link to="/">
                <img src="/images/rayo.png"
                    className="header__logo"
                    alt="logo"
                />
            </Link>

            <Link to="/chats">
                <IconButton>
                    <ChatIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
        </div>
    );
}

export default Header;
