import { useState } from 'react'

import { ArrowPathIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useDropzone } from 'react-dropzone'

import { Label, useFormContext } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

type UploadDropZoneProps = {
  name: string
  label: string
  multiple: boolean
  originalImgSrc?: string
  reset: boolean
}

export function UploadDropZone({
  name,
  label,
  multiple = false,
  originalImgSrc,
  reset,
}: UploadDropZoneProps) {
  // Is this this the right way with RHF? Or should we wrap in a Controller?
  const { setValue, setError, clearErrors } = useFormContext()
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])

  if (reset) {
    clearErrors()
    // setFilesToUpload([])
    // setValue(name, null)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      clearErrors()

      if (multiple) {
        setValue(name, files)
        setFilesToUpload(files)
      } else {
        // When its not multiple, assume the first one from the list
        // Because file inputs always return a FileList aka File[]
        setValue(name, files[0])
        setFilesToUpload(files)
      }
    },
    onDropRejected: (fileRejection) => {
      toast.error(fileRejection[0].errors[0].message)
      setError(name, {
        message: fileRejection[0].errors[0].message,
      })
    },
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
    multiple,
  })

  const ImagePreview = ({ imgSrc }) => {
    return (
      <div>
        {imgSrc && (
          <div className="group relative">
            <img src={imgSrc} className="max-h-60 rounded" alt="preview" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ArrowPathIcon className="mx-auto h-12 w-12 text-gray-500" />
            </div>
          </div>
        )}
      </div>
    )
  }

  const FilePreview = ({ file }) => {
    const reader = new FileReader()
    const [dataURI, setDataURI] = useState('')

    reader.onload = () => {
      setDataURI(reader.result.toString())
    }

    reader.readAsDataURL(file)
    return (
      <div>
        {dataURI && (
          <div className="group relative">
            <img src={dataURI} className="max-h-60 rounded" alt={file.name} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ArrowPathIcon className="mx-auto h-12 w-12 text-gray-500" />
            </div>
          </div>
        )}
        <p className="my-2 text-sm text-slate-500">
          {file.name} - {file.size} bytes
        </p>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10"
    >
      <div className="text-center">
        {filesToUpload.map((file) => {
          return <FilePreview file={file} key={file.name} />
        })}

        {!filesToUpload.length && originalImgSrc && (
          <ImagePreview imgSrc={originalImgSrc} />
        )}
        {filesToUpload.length === 0 && (
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
