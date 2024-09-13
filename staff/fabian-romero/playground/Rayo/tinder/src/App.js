import React from 'react'; // Añadir esta línea para evitar el error de JSX
import './App.css';
import Header from './Header.js';
import ChatIndividual from './ChatIndividual.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TarjetasTinder from './TarjetasTinder.js';
import BotonesSwipe from './BotonesSwipe.js';
import ListadoChats from './ListadoChats.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/chat/:persona" element={
            <>
              <Header botonRetroceder="/chats" />
              <ChatIndividual />
            </>
          } />

          <Route path="/chats" element={
            <>
              <Header botonRetroceder="/" />
              <ListadoChats />
            </>
          } />

          <Route path="/" element={
            <>
              <Header />
              <TarjetasTinder />
              <BotonesSwipe />
            </>
          } />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
