import logic from '../../logic/index.mjs';
import formatTime from '../../util/formatTime.mjs';

const Component = React.Component;

class Home extends Component {
    constructor() {
        super();

        try {
            const posts = logic.getAllPosts();

            this.state = { posts };
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    // clearPosts() {

    // }

    handleLogoutClicked() {
        try {
            logic.logoutUser();

            location.href = '../login';
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleHomeButton() {
        // clearPosts();
        // generatePostList();
    }

    render() {
        return <>
            <header className="header">
                <p className="user-name">{logic.getUserName()}</p>
                <button className="logout-button" onClick={this.handleLogoutClicked}>Logout</button>
            </header>
            <main className="view main">
                <section className="post-list">
                    {this.state.posts.map(post => <article className="post">
                        <h3 >{post.author}</h3>
                        <img src={post.img} className="post__image" />
                        <hr></hr>
                        <p className="post__caption">{post.caption}</p>
                        <time className="post__time">{formatTime(new Date(post.date))}</time>
                    </article>)}
                </section>
            </main>
            <footer className="footer">
                <button className="home-button" onClick={this.handleHomeButton}></button>
                <button className="search-button" ></button>
                <button className="add-post-button" >+</button>
                <button className="followed-button" ></button>
                <button className="save-button" ></button>
            </footer>
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />)