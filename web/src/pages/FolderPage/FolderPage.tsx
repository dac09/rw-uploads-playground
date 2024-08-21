import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import FolderCell from 'src/components/FolderCell'

const FolderPage = ({ id }) => {
  console.log(`👉 \n ~ id:`, id)
  return (
    <>
      <Metadata title="Folder" description="Folder page" />

      <FolderCell id={id} />
    </>
  )
}

export default FolderPage
