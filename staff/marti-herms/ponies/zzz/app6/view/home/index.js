{
    const home = new Component(document.body);

    const header = new Header();
    home.add(header);

    const body = new Component(document.createElement('main'));
    body.setClassName('view main');
    home.add(body);

    const postListSection = new PostList();
    body.add(postListSection);

    postListSection.generatePostList(logic.getAllPostIDs());

    const intervalID = setInterval(function () {
        postIDs = logic.getAllPostIDs();
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getAllPostIDs());
    }, 2000);

    logic.setIntervalID(intervalID);

    const footer = new Footer();
    home.add(footer);

    footer.onPostCreated(() => {
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getAllPostIDs());
    });

    footer.onListFeed(() => {
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getAllPostIDs());

        const intervalID = setInterval(function () {
            postListSection.clearPosts();
            postListSection.generatePostList(logic.getAllPostIDs());
        }, 2000);

        logic.setIntervalID(intervalID);
    })

    footer.onListSavedPost(() => {
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getUserSavedPosts());

        const intervalID = setInterval(function () {
            postListSection.clearPosts();
            postListSection.generatePostList(logic.getUserSavedPosts());
        }, 2000);

        logic.setIntervalID(intervalID);
    })
}