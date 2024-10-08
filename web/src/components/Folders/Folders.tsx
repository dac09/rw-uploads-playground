import { FoldersQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

const Folders = ({ folders }: { folders: FoldersQuery['folders'] }) => {
  return (
    <>
      {folders.map((folder) => (
        <div
          key={folder.name}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-700 bg-transparent px-6 py-5 shadow-sm hover-effect"
        >
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-red-200" />
          </div>
          <FolderDetails folder={folder} />
        </div>
      ))}
    </>
  )
}
export default Folders

function FolderDetails({ folder }) {
  return (
    <div className="min-w-0 flex-1">
      <Link
        to={routes.folder({
          id: folder.id,
        })}
        className="focus:outline-none"
      >
        <span aria-hidden="true" className="absolute inset-0" />
        <p className="text-sm font-medium text-slate-100">{folder.name}</p>
        {folder.files ? (
          <p className="truncate text-sm text-gray-500">
            Contains {folder.files?.length} files
          </p>
        ) : (
          <p className="truncate text-sm text-gray-500">Empty</p>
        )}
      </Link>
    </div>
  )
}
