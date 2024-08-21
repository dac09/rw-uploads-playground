import type { FindFolderQuery, FindFolderQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import FileCard from '../FileCard/FileCard'

import { FolderUpload } from './FolderUpload'

export const QUERY: TypedDocumentNode<
  FindFolderQuery,
  FindFolderQueryVariables
> = gql`
  query FindFolderQuery($id: Int!) {
    folder: folder(id: $id) {
      id
      files {
        id
        path
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = FolderUpload

export const Failure = ({
  error,
}: CellFailureProps<FindFolderQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  folder,
}: CellSuccessProps<FindFolderQuery, FindFolderQueryVariables>) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {folder.files.map((file, index) => (
          <>
            <FileCard key={index} file={file} type="image" />
          </>
        ))}
      </div>
      <hr className="my-6 flex border-gray-600" />
      <FolderUpload id={folder.id} preamble="Add some more files" />
    </div>
  )
}

export const isEmpty = ({ folder }: FindFolderQuery) => {
  console.log(`👉 \n ~ folder:`, folder)
  return folder.files.length === 0
}
