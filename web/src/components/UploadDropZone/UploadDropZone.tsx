import { useCallback, useState } from 'react'

import { PhotoIcon } from '@heroicons/react/24/outline'
import { useDropzone } from 'react-dropzone'

import { Controller, InputField, Label, useFormContext } from '@redwoodjs/forms'

export function UploadDropZone({ name, label }) {
  const { control, setValue } = useFormContext()

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (files) => {
      console.log('dropped files:', files)
      setValue(name, files[0])
    },
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
    multiple: false,
  })

  const FilePreview = ({ file }) => {
    const reader = new FileReader()
    const [dataURI, setDataURI] = useState('')

    reader.onload = () => {
      setDataURI(reader.result.toString())
      // Do something with the data URI
    }

    reader.readAsDataURL(file)
    return (
      <li>
        {file.name} - {file.size} bytes
        {dataURI && (
          <img src={dataURI} className="max-h-60 rounded" alt={file.name} />
        )}
      </li>
    )
  }

  return (
    <div
      id="droppy"
      {...getRootProps()}
      className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10"
    >
      <div className="text-center">
        {acceptedFiles.map((file) => {
          return <FilePreview file={file} key={file.name} />
        })}
        {acceptedFiles.length === 0 && (
          <>
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-500"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-400">
              <Label
                name={name}
                className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                errorClassName="rw-label rw-label-error"
              >
                {label}
              </Label>
              <p className="pl-1">or drag and drop</p>
            </div>
          </>
        )}
        <input {...getInputProps()} />
      </div>
    </div>
  )
}
