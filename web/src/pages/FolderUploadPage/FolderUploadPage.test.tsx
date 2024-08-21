import { render } from '@redwoodjs/testing/web'

import FolderUploadPage from './FolderUploadPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FolderUploadPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FolderUploadPage />)
    }).not.toThrow()
  })
})
