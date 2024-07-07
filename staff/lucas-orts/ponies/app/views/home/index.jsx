import Header from "./components/Header"
import PostList from "./components/PostList"
import Footer from "./components/Footer"
import FollowingPostList from "./components/FollowingPostList"
import FavsPostList from "./components/FavsPostList"

const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = { refreshStamp: null, view: 'home' }
    }


    handlePostCreated() {
        this.setState({ refreshStamp: Date.now() })
    }

    handleHomeClick() {
        this.setState({ view: 'home' })
    }

    handleFollowClick() {
        this.setState({ view: 'follows' })
    }

    handleFavsClick() {
        this.setState({ view: 'favs' })
    }

    render() {
        return <>
            <Header
                onHomeClick={this.handleHomeClick.bind(this)}

                onFollowClick={this.handleFollowClick.bind(this)}

                onFavsClick={this.handleFavsClick.bind(this)}
            />

            <main className="view main">
                {this.state.view === 'home' && <PostList refreshStamp={this.state.refreshStamp} />}

                {this.state.view === 'follows' && <FollowingPostList />}

                {this.state.view === 'favs' && <FavsPostList />}
            </main>
            <Footer onPostCreated={this.handlePostCreated.bind(this)} />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)