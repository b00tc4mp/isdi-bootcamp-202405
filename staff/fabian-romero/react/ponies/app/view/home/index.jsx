import Header from './component/Header'
import PostList from './component/PostList'
import Footer from './component/Footer'

const Component = React.Component

class Home extends Component {
    constructor() {
        console.debug('Home -> contructor')

        super()

        this.state = { refreshStamp: null }
    }

    handlePostCreated() {
        console.debug('Home -> handlePostCreated')

        this.setState({ refreshStamp: Date.now() }) // esto es para que postList se refresque.
    }

    // siempre tiene que estar contenido en algun contenedor(abajo en el render) si no, no sabe que esta devolviendo

    render() {
        console.debug('Home -> render')

        return <>
            <Header />

            <main className="view main">
                <PostList refreshStamp={this.state.refreshStamp} />
            </main>

            <Footer onPostCreated={this.handlePostCreated.bind(this)} />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)