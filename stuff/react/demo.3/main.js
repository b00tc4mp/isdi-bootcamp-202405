const _jsx = (tagName, props) => {
    return React.createElement(tagName, props)
}

const title = _jsx('h1', { children: 'Hello, World!' })

const query = _jsx('input', { type: 'text', name: 'q', placeholder: 'Search' })

const form = _jsx('form', {
    children: query,
    action: 'https://www.google.com/search'
})

const samu = _jsx('li', { children: 'Samu' })
const edu = _jsx('li', { children: 'Edu' })
const marti = _jsx('li', { children: 'Martí' })

const people = _jsx('ul', { children: [samu, edu, marti] })

const Component = React.Component

class Hello extends Component {
    constructor() {
        super()
    }

    render() {
        return _jsx('h1', { children: 'Hello!' })
    }
}

function Goodbye() {
    return _jsx('h1', { children: 'Goodbye!' })
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
        // const self = this

        return _jsx('button', {
            children: this.state.count,

            // FAILS!
            // onClick: function () {
            //     this.setState({ count: this.state.count + 1 })
            // }

            // WORKS!
            // onClick: function () {
            //     self.setState({ count: self.state.count + 1 })
            // }

            // WORKS!
            // onClick: () => {
            //     this.setState({ count: this.state.count + 1 })
            // }

            // WORKS!
            // onClick: function () {
            //     self.handleClick()
            // }

            // WORKS!
            onClick: () => this.handleClick()
        })
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render([title, form, people, _jsx(Hello, {}), _jsx(Goodbye, {}), _jsx(Counter, {})])

