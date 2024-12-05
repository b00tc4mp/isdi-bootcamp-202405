const title = React.createElement('h1', { children: 'Hello, World! ' })

const query = React.createElement('input', { type: 'text', name: 'q', placeholder: 'search' })

const form = React.createElement('form', {
    children: query,
    action: 'https://www.google.com/search'
})

const samu = React.createElement('li', { children: 'Samu' })
const edu = React.createElement('li', { children: 'Edu' })
const marti = React.createElement('li', { children: 'Marti' })

const people = React.createElement('ul', { children: [samu, edu, marti] })

const Component = React.Component

class Hello extends Component {
    constructor() {
        super()

    }

    render() {
        return React.createElement('h1', { children: 'Hello!' })
    }
}

function Goodbye() {
    return React.createElement('h1', { children: 'Goodbye!' })
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
        //const self = this

        return React.createElement('button', {
            children: this.state.count,

            //FAILS!
            //onClick: function(){
            //this.setState({count: this.state.count + 1})
            //}

            //WORKS!
            //onCLick: function(){
            //    self.setState({count: self.state.count + 1})
            //}

            //WORKS!
            //onClick: () =>{
            //  this.seState({ count: this.state.count + 1})
            //}

            //WORKS!
            //onClick: function(){
            //  self.handleClick()
            //}

            //WORKS!
            onClick: () => this.handleClick()
        })
    }
}

const root = ReactDOM.createRoot(document.getElelementById('root'))
// root.render([title, form, people, new Hello().render(), Goodbye(), new Counter.render()])
root.render([title, form, people, React.createElement(Hello, {}), React.createElement(Goodbye, {}), React.createElement(Counter, {})])