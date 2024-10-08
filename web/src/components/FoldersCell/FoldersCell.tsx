import type { FoldersQuery, FoldersQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Folders from 'src/components/Folders'
import NewFolderItem from 'src/components/NewFolderItem'

export const QUERY: TypedDocumentNode<FoldersQuery, FoldersQueryVariables> =
  gql`
    query FoldersQuery {
      folders {
        id
        name
        files {
          id
        }
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ folders }: CellSuccessProps<FoldersQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Folders folders={folders} />
      <NewFolderItem />
    </div>
  )
}
