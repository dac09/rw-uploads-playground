import { render } from '@redwoodjs/testing/web'

import FileCard from './FileCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileCard />)
    }).not.toThrow()
  })
})
