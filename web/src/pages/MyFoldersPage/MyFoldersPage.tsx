import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import FoldersCell from 'src/components/FoldersCell'

const FolderUploadPage = () => {
  return (
    <>
      <Metadata title="FolderUpload" description="FolderUpload page" />

      <FoldersCell />
    </>
  )
}

export default FolderUploadPage
