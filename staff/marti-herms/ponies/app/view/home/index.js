{
    const home = new Component(document.body);

    const header = new Header();
    home.add(header);

    const body = new Component(document.createElement('main'));
    body.setClassName('view main');
    home.add(body);

    const postListSection = new PostList();
    body.add(postListSection);

    postListSection.generateFeedPostList();

    const intervalID = setInterval(function () {
        postListSection.clearPosts();
        postListSection.generateFeedPostList();
    }, 2000);

    logic.setIntervalID(intervalID);

    const footer = new Footer();
    home.add(footer);

    footer.onPostCreated(() => {
        postListSection.clearPosts();
        postListSection.generateFeedPostList();
    });

    footer.onSavedListClicked(() => {
        postListSection.clearPosts();
        postListSection.generateSavedPostList();
    })
}