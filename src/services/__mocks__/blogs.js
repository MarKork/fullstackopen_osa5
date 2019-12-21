const blogs = [
    {
      title: 'firstblogtitle',
      author: 'firstblogauthor',
      url: 'www.firstblog',
      likes: 1,
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    },
    {
      title: 'secondblogtitle',
      author: 'secondblogauthor',
      url: 'www.secondblog',
      likes: 1,
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    },
    {
      title: 'thirdblogtitle',
      author: 'thirdblogauthor',
      url: 'www.thirdblog',
      likes: 1,
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    }
  ]
  
  let token = null;

  const getAll = () => {
    return Promise.resolve(blogs)
  }

  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  export default { getAll, setToken }