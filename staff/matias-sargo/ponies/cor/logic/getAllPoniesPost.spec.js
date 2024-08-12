describe('getAllPoniesPosts', () => {
  before(done => {
      mongoose.connect(process.env.MONGODB_URI)
          .then(() => done())
          .catch(error => done(error));
  });

  beforeEach(done => {
      User.deleteMany()
          .then(() => Post.deleteMany())
          .then(() => done())
          .catch(error => done(error));
  });

  it('succeeds on existing user listing all following posts', done => {
      Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
          .then(post => {
              User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123', following: ['gonzalo'] })
                  .then(user => {
                      getAllPoniesPosts(user.username, (error, posts) => {
                          if (error) {
                              console.error(error)

                              return
                          }
                          User.findOne({ username: 'gonzalo' }).lean()
                              .then(user => {
                                  expect(user.following).to.include(post.author)

                                  done()
                              })
                              .catch(error => done(error))
                      })
                  })
                  .catch(error => done(error))
          })
          .catch(error => done(error))
  })

  it('fails on non-existing user', done => {
      getAllPoniesPosts('gonza', error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('user not found')

          done()
      })
  })

  it('fails on non-string username', () => {
      let error

      try {
          getAllPoniesPosts(123, error => { })
      } catch (_error) {
          error = _error
      } finally {
          expect(error).to.be.instanceOf(TypeError)
          expect(error.message).to.equal('username is not a string')
      }
  })

  it('fails on invalid username', () => {
      let error

      try {
          getAllPoniesPosts('gon', error => { })
      } catch (_error) {
          error = _error
      } finally {
          expect(error).to.be.instanceOf(SyntaxError)
          expect(error.message).to.equal('invalid username')
      }
  })
  afterEach(done => {
      User.deleteMany()
          .then(() => Post.deleteMany())
          .then(() => done())
          .catch(error => done(error));
  });

  it('fails on non-function callback', () => {
      let error

      try {
          getAllPoniesPosts('gonzalo', 123)
      } catch (_error) {
          error = _error
      } finally {
          expect(error).to.be.instanceOf(TypeError)
          expect(error.message).to.equal('callback is not a function')
      }
  })

  afterEach(done => {
      User.deleteMany()
          .then(() => Post.deleteMany())
          .then(() => done())
          .catch(error => done(error));
  });

  after(done => {
      mongoose.disconnect()
          .then(() => done())
          .catch(error => done(error));
  });
});