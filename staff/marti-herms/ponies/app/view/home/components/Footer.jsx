import logic from '../../../logic/index.mjs';

const { Component } = React;

class Footer extends Component {
    constructor() {
        super();

        this.state = { addPostVisibility: false };
    }

    handleHomeButton() {

    }

    handleSearchUserButton() {

    }

    handleAddPostButton() {
        this.setState({ addPostVisibility: true })
    }

    handleAddPost(event) {
        event.preventDefault();

        const form = event.target

        const postImageInput = form['post-image-input'];
        const postCaptionInput = form['post-caption-input'];

        const postImage = postImageInput.value;
        const postCaption = postCaptionInput.value;

        try {
            logic.addPost(postImage, postCaption);

            this.setState({ addPostVisibility: false })

            this.props.onPostCreated();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleCancel(event) {
        event.stopPropagation();

        if (event.target.className === 'fader')
            this.setState({ addPostVisibility: false });
    }

    handleCancelButton() {
        this.setState({ addPostVisibility: false });
    }

    handleFollowedPostsButton() {

    }

    handleSavedPostsButton() {

    }



    render() {
        const addPostSection = <div className="fader" onClick={this.handleCancel.bind(this)}>
            <section className='newposts'>
                <h2>Create Post</h2>
                <form onSubmit={this.handleAddPost.bind(this)}>
                    <div className='form__field'>
                        <label htmlFor="post-image-input">Image:</label>
                        <input id='post-image-input' className='form__input' type="text" />
                    </div>
                    <div className='form__field'>
                        <label htmlFor="post-caption-input">Caption:</label>
                        <input id='post-caption-input' className='form__input' type="text" />
                    </div>
                    <button className='form__button' type='submit'>Create</button>
                    <button className='form__button' type='button' onClick={this.handleCancelButton.bind(this)}>Cancel</button>
                </form>
            </section>
        </div>

        return <footer className="footer">
            {this.state.addPostVisibility && addPostSection}
            <button className="home-button" onClick={this.handleHomeButton}></button>
            <button className="search-button" onClick={this.handleSearchUserButton}></button>
            <button className="add-post-button" onClick={this.handleAddPostButton.bind(this)}>+</button>
            <button className="followed-button" onClick={this.handleFollowedPostsButton}></button>
            <button className="save-button-list" onClick={this.handleSavedPostsButton}></button>
        </footer>
    }
}

export default Footer;