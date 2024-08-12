import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './src/App.jsx'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

document.getElementById('root').className = 'w-screen h-screen'

root.render(<Router><App /></Router>)