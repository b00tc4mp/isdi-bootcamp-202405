const { Component } = React
// const Component = React.Component

class Image extends Component {
    constructor() {
        super(document.createElement('img'))
    }

    setUrl(url) {
        this.container.src = url
    }
}

export default Image