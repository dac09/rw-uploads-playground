import { render } from '@redwoodjs/testing/web'

import UploadDropZone from './UploadDropZone'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploadDropZone', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadDropZone />)
    }).not.toThrow()
  })
})
