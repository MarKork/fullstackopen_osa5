import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import SimpleBlog from './SimpleBlog'
import { render, fireEvent } from '@testing-library/react'

test('renders title', () => {
  const blog = {
    title: 'The blog title',
    author: 'The author',
    likes: 1
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'The blog title'
  )
})

test('renders author', () => {
  const blog = {
    title: 'The blog title',
    author: 'The author',
    likes: 1
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )
 
  expect(component.container).toHaveTextContent(
    'The author'
  )
})

test('renders likes', () => {
  const blog = {
    title: 'The blog title',
    author: 'The author',
    likes: 1
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )
 
  expect(component.container).toHaveTextContent(
    '1'
  )
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'The blog title',
    author: 'The author',
    likes: 1
  }
  
  const mockHandler = jest.fn()
  
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})