import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer.jsx'
import FavsPostList from './components/FavsPostList.jsx'
import PoniesPostList from './components/PoniesPostList.jsx'

import { Component } from 'react'

class Home extends Component {
    constructor() {
        console.debug('Home -> constructor')

        super()

        this.state = { refreshStamp: null, view: 'home' }
    }

    handleHomeClick() {
        console.debug('Home -> handleHomeClick')

        this.setState({ view: 'home' })
    }

    handleFavsClick() {
        console.debug('Home -> handleFavsClick')

        this.setState({ view: 'favs' })
    }

    handlePoniesClick() {
        console.debug('Home -> handlePoniesClick')

        this.setState({ view: 'ponies' })
    }

    handlePostCreated() {
        console.debug('Home -> handlePostCreated')

        this.setState({ refreshStamp: Date.now() })
    }

    render() {
        console.debug('Home -> render')

        return <>
            <Header className="header__user-name"
                onHomeClick={this.handleHomeClick.bind(this)}
                onPoniesClick={this.handlePoniesClick.bind(this)}
                onFavsClick={this.handleFavsClick.bind(this)}
            />
            
            <main className="view main">
                {this.state.view === 'home' && <PostList refreshStamp={this.state.refreshStamp} />}

                {this.state.view === 'ponies' && <PoniesPostList />}
                
                {this.state.view === 'favs' && <FavsPostList />}
            </main>

            <Footer onPostCreated={this.handlePostCreated.bind(this)} />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)