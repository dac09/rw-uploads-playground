import { useState } from 'react'

import { Form, Submit, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { UploadDropZone } from '../UploadDropZone'

export const FolderUpload = ({ id, preamble }) => {
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

  const form = useForm()
  const [resetUpload, setResetUpload] = useState(false)

  const [updateFolder] = useMutation(UPDATE_FOLDER_MUTATION, {
    onCompleted: () => {
      toast.success('Folder updated')
      form.reset()
      setResetUpload(true)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    updateFolder({ variables: { id, input } })
  }

  return (
    <div className="relative min-h-[200px]">
      {preamble && <p className="text-sm text-gray-400">{preamble}</p>}
      <Form onSubmit={onSave} className="h-full">
        <UploadDropZone
          name="files"
          multiple
          label="Choose files"
          reset={resetUpload}
        />
        <Submit
          onSubmit={onSave}
          className="absolute bottom-10 right-6 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </Submit>
      </Form>
    </div>
  )
}
