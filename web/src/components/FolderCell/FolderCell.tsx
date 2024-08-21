import type { FindFolderQuery, FindFolderQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  Cel,
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
      name
      files {
        id
        path
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ folder }: { folder: FindFolderQuery['folder'] }) => (
  <FolderUpload folderName={folder.name} id={folder.id} />
)

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
      <FolderUpload
        id={folder.id}
        preamble="Add some more files"
        folderName={folder.name}
      />
    </div>
  )
}

export const isEmpty = ({ folder }: FindFolderQuery) => {
  return folder.files.length === 0
}
