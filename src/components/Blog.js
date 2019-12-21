import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLikes, handleDelete }) => {
  const [isVisible, setVisible] = useState(false)
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!isVisible)
  }

  const showingRemoveButton = () => {
    let blogUserName=''
    if(blog.user){
      blogUserName = blog.user.username
    }
    let currentUserName=''
    if(user){
      currentUserName=user.username
    }
    if(currentUserName && currentUserName === blogUserName) 
      { 
        return <button onClick={handleDelete}>remove</button>
      }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style = {blogStyle}>
      <div onClick = {toggleVisibility} >
        {blog.title} {blog.author}
      </div>
      <div  style = {showWhenVisible}>
        <a href = {blog.url}>{blog.url} </a>
        <div> {blog.likes}  likes<button onClick = {addLikes}>like</button></div>
        <div>added by {blog.user? blog.user.username :""}</div>
        <div>{showingRemoveButton()}</div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  addLikes: PropTypes.func.isRequired,
  handleDelete:PropTypes.func.isRequired
}

export default Blog