import logic from '../../logic/index.mjs'

import Header from './components/Header'
import PostList from './components/PostList'

const Component = React.Component

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return <>
            <Header />

            <main className="view main">
                <PostList />
            </main>
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)