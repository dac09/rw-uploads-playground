import { Form, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { UploadDropZone } from '../UploadDropZone'

export const FolderUpload = ({ id }) => {
  const UPDATE_FOLDER_MUTATION = gql`
    mutation UpdateFolderMutation($id: Int!, $input: UpdateFolderInput!) {
      updateFolder(id: $id, input: $input) {
        id
        files {
          id
          path
        }
      }
    }
  `

  const [updateFolder] = useMutation(UPDATE_FOLDER_MUTATION, {
    onCompleted: () => {
      toast.success('Folder updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    console.log(`👉 \n ~ input:`, input)
    updateFolder({ variables: { id, input } })
  }

  return (
    <div>
      <p className="text-sm text-gray-400">
        Folder has no files, drag and drop to add some
      </p>
      <Form onSubmit={onSave}>
        <UploadDropZone name="files" multiple label="Choose files" />
        <Submit
          onSubmit={onSave}
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </Submit>
      </Form>
    </div>
  )
}
