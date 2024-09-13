import React from 'react';
import './BotonesSwipe.css';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { IconButton } from '@mui/material';

function BotonesSwipe() {
    return (
        <div className="botonesSwipe">
            <IconButton className="botonesSwipe__replay">
                <ReplayIcon fontSize="large" />
            </IconButton>

            <IconButton className="botonesSwipe__close">
                <CloseIcon fontSize="large" />
            </IconButton>

            <IconButton className="botonesSwipe__star">
                <StarIcon fontSize="large" />
            </IconButton>

            <IconButton className="botonesSwipe__fav">
                <FavoriteIcon fontSize="large" />
            </IconButton>

            <IconButton className="botonesSwipe__flash">
                <FlashOnIcon fontSize="large" />
            </IconButton>
        </div>
    );
}

export default BotonesSwipe;
