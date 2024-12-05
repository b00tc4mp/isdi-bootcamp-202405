const title = React.createElement('h1', { children: 'Hello, World!' })

const query = React.createElement('input', { type: 'text', name: 'q', placeholder: 'Search' })

const form = React.createElement('form', {
    children: query,
    action: 'https://www.google.com/search'
})

const samu = React.createElement('li', { children: 'Samu' })
const edu = React.createElement('li', { children: 'Edu' })
const marti = React.createElement('li', { children: 'Martí' })

const people = React.createElement('ul', { children: [samu, edu, marti] })

const Component = React.Component

class Hello extends React.Component {
    constructor() {
        super()
    }

    render() {
        return React.createElement('h1', {children: 'Hello!'})
    }
}

function Goodbye() {
    return React.createElement('h1', {children: 'Goodbye!'})
}

class Counter extends Component {
    constructor() {
    super()

    this.state = {count: 0}

}

handleClick() {
    this.setState({count: this.state.count + 1})
}

render() {
    const self = this
    return React.createElement('button', {
        children: this.state.count,

        onClick: () {
            self.handleClick()
        }
    })
}

}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render([title, form, people, new Hello().render(), Goodbye(), new Counter().render()])