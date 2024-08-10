import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './view/App.jsx'

createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)