import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import Blog from './SimpleBlog'
import { render, fireEvent } from '@testing-library/react'

test('renders title and author', () => {
  const blog = {
    title: 'Testing the blog title',
    author: 'Testing the author',
    url: 'Testingtheurl',
    likes: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing the blog title'
  )
  expect(component.container).toHaveTextContent(
      'Testing the author'
  )
})