import Header from './component/Header'
import PostList from './component/PostList'
import Footer from './component/Footer'
import PoniesPostList from './component/PoniesPostList'
import FavsPostList from './component/FavsPostList'

const Component = React.Component

class Home extends Component {
    constructor() {
        console.debug('Home -> constructor')

        super()

        this.state = { refreshStamp: null, view: 'home' } // aqui le agrege otra coss para qwue se actualice en el render
    }

    handlePostCreated() {
        console.debug('Home -> handlePostCreated')

        this.setState({ refreshStamp: Date.now() }) // esto es para que postList se refresque cuando creo un post nuevo
    }

    handlePoniesClick() { // es aaqui cuando le digo ARREGLAR
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
    // siempre tiene que estar contenido en algun contenedor(abajo en el render) si no, no sabe que esta devolviendo

    render() {
        console.debug('Home -> render')

        return <>
            <Header
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