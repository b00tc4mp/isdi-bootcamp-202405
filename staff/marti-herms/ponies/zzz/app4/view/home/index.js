{
    const home = new Component(document.body);


    const header = new Header();
    home.add(header);


    const body = new Component(document.createElement('main'));
    body.setClassName('view main');
    home.add(body);


    const postListSection = new PostList();
    body.add(postListSection);


    postListSection.generatePostList();


    const footer = new Footer();
    home.add(footer);
}