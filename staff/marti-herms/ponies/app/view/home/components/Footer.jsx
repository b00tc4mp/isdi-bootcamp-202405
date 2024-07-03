import logic from '../../../logic/index.mjs';

const { Component } = React;

class Footer extends Component {
    constructor() {
        super();

        this.state = {
            addPost: false
        }
    }

    handleHomeButton() {

    }

    handleSearchUserButton() {

    }

    handleAddPostButton = () => {
        this.setState({ addPost: true })
    }

    handleAddPost = (event) => {
        event.preventDefault();

        const form = event.target

        const postImageInput = form['post-image-input'];
        const postCaptionInput = form['post-caption-input'];

        const postImage = postImageInput.value;
        const postCaption = postCaptionInput.value;

        try {
            logic.addPost(postImage, postCaption);

            this.setState({ addPost: false })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleCancel = (event) => {
        event.stopPropagation();

        if (event.target.className === 'fader')
            this.setState({ addPost: false });
    }

    handleFollowedPostsButton() {

    }

    handleSavedPostsButton() {

    }



    render() {
        const addPostSection = <>
            <div className="fader" onClick={this.handleCancel}>
                <section className='newposts'>
                    <h2>Create Post</h2>
                    <form onSubmit={this.handleAddPost}>
                        <div className='form__field'>
                            <label htmlFor="post-image-input">Image:</label>
                            <input id='post-image-input' className='form__input' type="text" />
                        </div>
                        <div className='form__field'>
                            <label htmlFor="post-caption-input">Caption:</label>
                            <input id='post-caption-input' className='form__input' type="text" />
                        </div>
                        <button className='form__button' type='submit'>Create</button>
                        <button className='form__button' type='text' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </section>
            </div>
        </>

        return <footer className="footer">
            {this.state.addPost && addPostSection}
            <button className="home-button" onClick={this.handleHomeButton}></button>
            <button className="search-button" onClick={this.handleSearchUserButton}></button>
            <button className="add-post-button" onClick={this.handleAddPostButton}>+</button>
            <button className="followed-button" onClick={this.handleFollowedPostsButton}></button>
            <button className="save-button" onClick={this.handleSavedPostsButton}></button>
        </footer>
    }
}

export default Footer;