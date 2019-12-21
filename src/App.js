import './App.css';
import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login' 
import Blog from './components/Blog'
import Notification from './components/Notification'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [createVisible, setCreateVisible] = useState(false)
  const usernameInLogin = useField('text')
  const passwordInLogin = useField('password')
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')
  
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [] )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: usernameInLogin.value,
        password: passwordInLogin.value,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      usernameInLogin.reset()
      passwordInLogin.reset()
      
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLikesOf = (id) => {
    try{
    const blog = blogs.find(b => b.id === id)
    const blogWithIncreasedLikes = { ...blog, likes:blog.likes+1}

    blogService
      .update(id, blogWithIncreasedLikes)
      .then(returnedBlog => {
        const updatedBlog = { ...returnedBlog, user: user }
        setBlogs(
          blogs.map(b => (b.id !== blog.id ? b : updatedBlog))
        )
      })
    }catch (error) {
      setErrorMessage(`Blog was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
  }

  const handleDeleteBlog = async (id) => {
    const blog = await blogs.find(b => b.id === id)
    try{
      if(window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)){
      await blogService
        .deleteBlog(id)
     } 
    }catch (error){
      setErrorMessage('Deleting failed')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    }
    blogService
        .getAll().then(initialBlogs => {
          setBlogs(initialBlogs)
        })
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return(  
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>new blog</button>
        </div>
        <div style = {showWhenVisible}>
          <form onSubmit = {addBlog}>
          <h2>create new</h2>
            <div>
              title
              <input {...blogTitle}/>  
            </div>
            <div>
             author
              <input {...blogAuthor}/>
            </div>
            <div>
              url
             <input {...blogUrl}/>
             </div>
            <button type = "submit">create</button>
          </form>
          <button onClick = {() => setCreateVisible(false)}>cancel</button>
          </div>
      </div>
    )
  }
          
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  
  const addBlog = (event) => {
      event.preventDefault()
      const blogObject = {
        title: blogTitle.value,
        author: blogAuthor.value,
        url: blogUrl.value,
        likes:0,
        user: user.name
      }
  
      blogService
        .create(blogObject)
        .then(data => {
          setBlogs(blogs.concat(data))
          blogTitle.reset()
          blogAuthor.reset()
          blogUrl.reset()
        })
        .catch(error => {
          setErrorMessage ('The attempted info was not created')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
          <div>
            <form>
              <div>
                username
                <input {...usernameInLogin}/> 
              </div>
              <div>
                password
                <input {...passwordInLogin}/>
              </div>
              <button type="submit" onClick={handleLogin}>login</button>
            </form>
          </div>
      </div>
    )
  }
  
  return (
    <div>
      <Notification message = {errorMessage} />
      
      <h2>blogs</h2>
      <div>
        <p>{user.username} logged in</p><button onClick = {handleLogout}>logout</button>
        {blogForm()}
      </div>
        {blogs.sort((a,b) => {return b.likes - a.likes}).map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            user={user} 
            addLikes={() => addLikesOf(blog.id)} 
            handleDelete={() =>handleDeleteBlog(blog.id)}/>
        )}
    </div>
  )
}

export default App;
