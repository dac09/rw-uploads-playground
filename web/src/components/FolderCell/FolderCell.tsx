import type { FindFolderQuery, FindFolderQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

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
  return <div>{JSON.stringify(folder)}</div>
}

export const isEmpty = ({ folder }: FindFolderQuery) => {
  console.log(`👉 \n ~ folder:`, folder)
  return folder.files.length === 0
}
