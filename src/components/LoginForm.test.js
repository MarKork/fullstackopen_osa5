import React from 'react'
import App from './App'
import { 
    render, waitForElement 
  } from '@testing-library/react'
  
  

  describe('<App />', () => {
    test('if no user logged, notes are not rendered', async () => {
      const component = render(
        <App />
      )
      component.rerender(<App />)
  
      await waitForElement(
        () => component.getByText('login')
      ) 
      const element = component.container.querySelector('login')
      expect(element).toBeDefined()
    })
  })