import { useState } from 'react'

import {
  ArrowTopRightOnSquareIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'
import { MyFile } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

// ... existing imports ...

const DELETE_FILE_MUTATION = gql`
  mutation DeleteFileFromFolder($id: Int!) {
    deleteFile(id: $id) {
      id
    }
  }
`

type FileCardProps = {
  file: MyFile
  type: 'image' | 'file'
}

const FileCard = ({ file, type }: FileCardProps) => {
  const [showModal, setShowModal] = useState(false)
  const [deleteFile] = useMutation(DELETE_FILE_MUTATION, {
    refetchQueries: ['FindFolderQuery'],
  })

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteFile({ variables: { id: file.id } })
  }

  if (type === 'image') {
    return (
      <div
        className="group relative flex flex-col items-center rounded-md border border-gray-600 p-2"
        key={`${file.id}-file`}
      >
        <button onClick={() => setShowModal(true)}>
          <img
            src={file.path}
            alt={file.name}
            className="mb-2 h-24 w-full cursor-pointer object-contain"
          />
          <span className="text-center text-sm">{file.name}</span>
        </button>
        <XCircleIcon
          className="absolute right-1 top-1 h-6 w-6 cursor-pointer text-blue-400 opacity-0 group-hover:opacity-50"
          onClick={handleDelete}
        />
        {showModal && (
          <button
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={() => setShowModal(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setShowModal(false)
            }}
            tabIndex={0}
          >
            <div className="scale-95 transform animate-modal opacity-0 transition-all duration-300 ease-in-out">
              <img
                src={file.path}
                alt={'File preview'}
                className="max-h-[90%] max-w-[90%] object-contain"
              />
            </div>
          </button>
        )}
      </div>
    )
  } else {
    return (
      <div className="group relative flex flex-col items-center">
        <a
          href={file.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <ArrowTopRightOnSquareIcon className="mb-2 text-4xl text-gray-600" />
          <span className="text-center text-sm">{file.name}</span>
        </a>
        <XCircleIcon
          className="absolute right-1 top-1 h-6 w-6 cursor-pointer text-red-500 opacity-0 group-hover:opacity-100"
          onClick={handleDelete}
        />
      </div>
    )
  }
}

export default FileCard
