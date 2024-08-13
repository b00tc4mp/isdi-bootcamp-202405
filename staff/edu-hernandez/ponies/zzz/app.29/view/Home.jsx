import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'
import PoniesPostList from './components/PoniesPostList'
import FavsPostList from './components/FavsPostList'

import { Component } from 'react'

class Home extends Component {
    constructor() {
        console.debug('Home -> constructor')

        super()

        this.state = { refreshStamp: null, view: 'home' }
    }

    handlePostCreated() {
        console.debug('Home -> handlePostCreated')

        this.setState({ refreshStamp: Date.now() })
    }

    handlePoniesClick() {
        console.debug('Home -> handlePoniesClick')

        this.setState({ view: 'ponies' })
    }

    handleHomeClick() {
        console.debug('Home -> handleHomeClick')

        this.setState({ view: 'home' })
    }

    handleFavsClick() {
        console.debug('Home -> handleFavsClick')

        this.setState({ view: 'favs' })
    }

    render() {
        console.debug('Home -> render')

        return <>
            <Header
                onHomeClick={this.handleHomeClick.bind(this)}
                onPoniesClick={this.handlePoniesClick.bind(this)}
                onFavsClick={this.handleFavsClick.bind(this)}
                onLogout={this.props.onLogout}
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

export default Home