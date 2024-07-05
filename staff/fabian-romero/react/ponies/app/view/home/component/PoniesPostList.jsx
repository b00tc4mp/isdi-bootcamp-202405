import logic from '../../../logic/index.mjs'

const { Component } = React

import Post from './Post.jsx'

class PoniesPostList extends Component {
    constructor() {
        console.debug('PoniesPostList -> contructor')

        super()

        try {
            const posts = logic.getAllPoniesPosts() // caambiar por la logica que trae solo los ffollower ya no seria get all post si no el get all fav post que ahora los ponies es followCORRIEGIR

            this.state = { posts } // inicializar los post lo llamamos, se contruye y luego en render lo pinta y me devulve todo el DOM
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        console.debug('PoniesPostList -> componentWillReceiveProps', newProps, this.props) // esto es una funcuon que tengo que saber que hace ciclo de vida del componente
        // react lo llama cuando detecta que cambia un prop 
        //se puede implementar a demanda y me dice que voy a recibir nuevos props (newProps)
        // new props

        if (newProps.refreshStamp !== this.props.refreshStamp)
            try {
                const posts = logic.getAllPoniesPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostDeleted() {// aqui llamo a la logica de deleted dentro del post list abajo
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() { // aqui llamo a la logica de edited  dentro del post list abajo
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {

        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFavToggled() {

        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowToggled() { // este es el mismo nombre que tengo en el renders

        try {
            const posts = logic.getAllPoniesPosts() // esta logica es la misma de arriba

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    render() {
        console.debug('PoniesPostList -> render')

        return <section className="post-list">
            {this.state.posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={this.handlePostDeleted.bind(this)}
                onPostEdited={this.handlePostEdited.bind(this)}
                onPostLikeToggled={this.handlePostLikeToggled.bind(this)}
                onPostFavToggled={this.handlePostFavToggled.bind(this)}
                onUserFollowToggled={this.handleUserFollowToggled.bind(this)}
            />)}
        </section>
    }
}

export default PoniesPostList
