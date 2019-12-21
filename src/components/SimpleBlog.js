import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
    <li className='title'>  
      {blog.title}</li><li className='author'> {blog.author}</li>
    </div>
    <div><li className='likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button></li>
    </div>
  </div>
)

export default SimpleBlog