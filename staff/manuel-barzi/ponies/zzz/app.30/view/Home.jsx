import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavsPostList from './home/FavsPostList'

const Component = React.Component

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