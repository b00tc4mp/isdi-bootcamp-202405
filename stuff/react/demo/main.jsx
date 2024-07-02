const title = <h1 className="text-red">Hello, World!</h1>

const query = <input type="text" name="q" placeholder="Seach" />

const form = <form action="https://www.google.com/search">{query}</form>

const samu = <li>Samu</li>
const edu = <li>Edu</li>
const marti = <li>Marti</li>

const people = <ul>{[samu, edu, marti]}</ul>

const Component = React.Component

class Hello extends Component {
    constructor() {
        super()
    }

    render() {
        return <h1>Hello!</h1>
    }
}

function Goodbye() {
    return <h1>Goodbye!</h1>
}

class Counter extends Component {
    constructor() {
        super()

        this.state = { count: 0 }
    }

    handleClick() {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        return <button onClick={() => this.handleClick()}>{this.state.count}</button>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render([title, form, people, <Hello />, <Goodbye />, <Counter />])

