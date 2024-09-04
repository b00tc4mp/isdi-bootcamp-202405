import { useState } from 'react';
import Header from './Header';
// import Footer from './Footer';
// import CreateProp from './CreateProp';

export default function Home() {
    const [showCreateProp, setShowCreateProp] = useState(false);

    const handlePropCreated = () => {
        // Aquí puedes agregar lógica para actualizar la lista de propiedades o realizar otras acciones después de que se haya creado una propiedad
        setShowCreateProp(false);
    };

    const handleCancelCreateProp = () => {
        setShowCreateProp(false);
    };

    const handleCreatePropClick = () => {
        setShowCreateProp(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-8">
                <h2 className="text-3xl">Welcome to the Home Page</h2>
                {/* Aquí podrías mostrar una lista de propiedades, si es necesario */}
                {showCreateProp && (
                    <CreateProp
                        onPropCreated={handlePropCreated}
                        onCancelCreateProp={handleCancelCreateProp}
                    />
                )}
            </main>
            <Footer onCreatePropClick={handleCreatePropClick} />
        </div>
    );
}