import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

import { Component } from 'react'

class Home extends Component {
    constructor() {
        super()

        this.state = { refreshStamp: null, view: 'home' }
    }

    handlePostCreated() {

        this.setState({ refreshStamp: Date.now() })
    }

    handleHome() {
        this.setState({ view: 'home' })
    }

    handleFavsPosts() {
        this.setState({ view: 'favorites' })
    }

    handleFollowingUsersPosts() {
        this.setState({ view: 'following' })
    }

    render() {
        return <>
            <Header
                onHomeClicked={this.handleHome.bind(this)} onFavsPostsClicked={this.handleFavsPosts.bind(this)} onFollowingUsersPostsClicked={this.handleFollowingUsersPosts.bind(this)} />

            <Body
                refreshStamp={this.state.refreshStamp}
                view={this.state.view} />

            <Footer
                onPostCreated={this.handlePostCreated.bind(this)} />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)