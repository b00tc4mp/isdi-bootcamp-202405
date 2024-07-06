import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'
import PoniesPostList from './components/PoniesPostList'
import FavsPostList from './components/FavsPostList'


const Component = React.Component

class Home extends Component {
    constructor() {
        console.debug('Home -> constructor')

        super()

        this.state = { refreshStamp: null, view: 'home' }  //está inicializando refreshStamp en null y view en home, para que se vea home según se abre la app
    }

    handlePostCreated() {
        console.debug('Home -> handlePostCreated')

        this.setState({ refreshStamp: Date.now() })  //fuerza las actualizaciones de la lista de posts
    }

    handlePoniesClick() {
        console.debug('Home -> handlePoniesClick')

        this.setState({ view: 'ponies' })  //cambia la vista a ponies
    }

    handleHomeClick() {
        console.debug('Home -> handleHomeClick')

        this.setState({ view: 'home' })  //cambia la vista a home
    }

    handleFavsClick() {
        console.debug('Home -> handleFavsClick')

        this.setState({ view: 'favs' })  //cambia la vista a favoritos
    }

    render() {
        console.debug('Home -> render')

        return <>
            <Header
                onHomeClick={this.handleHomeClick.bind(this)}  //hace que al pulsar el botón de Home, la vista se cambie a home
                onPoniesClick={this.handlePoniesClick.bind(this)}  //hace que al pulsar el botón de Follow, la vista se cambie a follow
                onFavsClick={this.handleFavsClick.bind(this)}  //hace que al pulsar el botón de Favoritos, la vista se cambie a favoritos
            />

            <main className="view main">
                {this.state.view === 'home' && <PostList refreshStamp={this.state.refreshStamp} />} { /*si view es home, se renderiza PostList*/}

                {this.state.view === 'ponies' && <PoniesPostList />}  { /*si view es ponies, se renderiza PoniesPostList*/}

                {this.state.view === 'favs' && <FavsPostList />}  { /*si view es favs, se renderiza FavsPostList*/}
            </main>

            <Footer onPostCreated={this.handlePostCreated.bind(this)} />  {/*renderiza el componente Footer */}
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />) //renderiza el componente Home en la raíz de React