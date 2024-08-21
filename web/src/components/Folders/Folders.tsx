import { Folder } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

const Folders = ({ folders }: { folders: Folder[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {folders.map((folder) => (
        <div
          key={folder.name}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-700 bg-slate-700 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <div alt="" className="h-10 w-10 rounded-full bg-red-200" />
          </div>
          <div className="min-w-0 flex-1">
            <Link
              to={routes.folder({
                id: folder.id,
              })}
              className="focus:outline-none"
            >
              <span aria-hidden="true" className="absolute inset-0" />
              <p className="text-sm font-medium text-slate-100">
                {folder.name}
              </p>
              {folders.files ? (
                <p className="truncate text-sm text-gray-500">
                  Contains {folder.files?.length} files
                </p>
              ) : (
                <p className="truncate text-sm text-gray-500">Empty</p>
              )}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Folders
