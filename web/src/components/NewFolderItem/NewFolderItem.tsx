import { FolderPlusIcon } from '@heroicons/react/24/outline'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

const CREATE_FOLDER_MUTATION = gql`
  mutation CreateFolderMutation($input: CreateFolderInput!) {
    createFolder(input: $input) {
      id
      name
    }
  }
`

const NewFolderItem = () => {
  const [createFolder] = useMutation(CREATE_FOLDER_MUTATION)

  const handleClick = async () => {
    try {
      const result = await createFolder({
        variables: { input: { name: 'New Folder' } },
      })
      const newFolderId = result.data.createFolder.id
      navigate(routes.folder({ id: newFolderId }))
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="group flex cursor-pointer items-center rounded-lg border-2 border-dashed border-gray-600 bg-transparent p-2 hover-effect"
    >
      <FolderPlusIcon className="mr-2 h-6 w-6 text-gray-400" />
      <span className="text-gray-500 group-hover:text-white">
        Create New Folder
      </span>
    </button>
  )
}

export default NewFolderItem
