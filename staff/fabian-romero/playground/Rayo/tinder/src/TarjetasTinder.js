import React, { useState } from 'react';
import './TarjetasTinder.css';
import TinderCard from 'react-tinder-card'

function TarjetasTinder() {
    const [personas, setPersonas] = useState([])

    return (
        <div className="tarjetasTinder">
            <div className="tarjetasTinder__contenedor">
                {personas.map(persona => (
                    <TinderCard
                        className="swipe"
                        key={persona.name}
                        preventSwipe={['up', 'down']}
                    >
                        <div
                            className="tarjeta"
                            style={{ backgroundImage: `url(${persona.url})` }}
                        >
                            <h2>{persona.nombre}</h2>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TarjetasTinder;
