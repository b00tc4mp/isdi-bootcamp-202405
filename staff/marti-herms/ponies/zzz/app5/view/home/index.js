{
    const home = new Component(document.body);

    const header = new Header();
    home.add(header);

    const body = new Component(document.createElement('main'));
    body.setClassName('view main');
    home.add(body);

    const postListSection = new PostList();
    body.add(postListSection);

    const postIDs = logic.getAllPostIDs();

    postListSection.generatePostList(postIDs);

    const intervalID = setInterval(function () {
        postListSection.clearPosts();
        postListSection.generatePostList(postIDs);
    }, 2000);

    logic.setIntervalID(intervalID);

    const footer = new Footer();
    home.add(footer);

    footer.onPostCreated(() => {
        postListSection.clearPosts();
        postListSection.generatePostList(postIDs);
    });

    footer.onListFeed(() => {
        postListSection.clearPosts();
        postListSection.generatePostList(postIDs);

        const intervalID = setInterval(function () {
            postListSection.clearPosts();
            postListSection.generatePostList(postIDs);
        }, 2000);

        logic.setIntervalID(intervalID);
    })

    footer.onListSavedPost(() => {
        const savedPosts = logic.getUserSavedPosts();
        postListSection.clearPosts();
        postListSection.generatePostList(savedPosts);

        const intervalID = setInterval(function () {
            postListSection.clearPosts();
            postListSection.generatePostList(savedPosts);
        }, 2000);

        logic.setIntervalID(intervalID);
    })
}