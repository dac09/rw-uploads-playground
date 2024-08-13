import { UserCircleIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from '@heroicons/react/24/outline'
import type { EditProfileById, UpdateProfileInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  FileField,
} from '@redwoodjs/forms'

type FormProfile = NonNullable<EditProfileById['profile']>

interface ProfileFormProps {
  profile?: EditProfileById['profile']
  onSave: (data: UpdateProfileInput, id?: FormProfile['id']) => void
  error: RWGqlError
  loading: boolean
}

const ProfileForm = (props: ProfileFormProps) => {
  const onSubmit = (data: FormProfile) => {
    props.onSave(data, props?.profile?.id)
  }

  return (
    <Form<FormProfile> onSubmit={onSubmit} error={props.error}>
      <div className="space-y-12 border-b border-white/10 pb-12">
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="avatar"
          className="block text-sm font-medium leading-6 text-white"
          errorClassName="rw-label-error"
        >
          Avatar
        </Label>

        <div className="mt-2 flex items-center gap-x-3">
          <UserCircleIcon
            aria-hidden="true"
            className="h-12 w-12 text-gray-500"
          />
          <FileField
            name="avatar"
            defaultValue={props.profile?.avatar}
            className="file:rounded-md file:bg-white/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white file:shadow-sm hover:file:bg-white/20"
            errorClassName="rw-input rw-input-error"
          />

          <FieldError name="avatar" className="rw-field-error" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Label
              name="firstName"
              className="block text-sm font-medium leading-6 text-white"
              errorClassName="rw-label rw-label-error"
            >
              First name
            </Label>
            <div className="mt-2">
              <TextField
                name="firstName"
                defaultValue={props.profile?.firstName}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                errorClassName="rw-input rw-input-error"
                validation={{ required: true }}
              />

              <FieldError name="firstName" className="rw-field-error" />
            </div>
            <div className="sm:col-span-3">
              <Label
                name="lastName"
                className="block text-sm font-medium leading-6 text-white"
                errorClassName="rw-label rw-label-error"
              >
                Last name
              </Label>
              <div className="mt-2">
                <TextField
                  name="lastName"
                  defaultValue={props.profile?.lastName}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                />

                <FieldError name="lastName" className="rw-field-error" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-white"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
            <UploadDropZone />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-white"
          >
            Cancel
          </button>
          <Submit
            disabled={props.loading}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </Submit>
        </div>
      </div>
    </Form>
  )
}

export default ProfileForm

function UploadDropZone() {
  return (
    <div className="text-center">
      <PhotoIcon
        aria-hidden="true"
        className="mx-auto h-12 w-12 text-gray-500"
      />
      <div className="mt-4 flex text-sm leading-6 text-gray-400">
        <Label
          name="coverPhoto"
          className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
          errorClassName="rw-label rw-label-error"
        >
          Cover photo
        </Label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs leading-5 text-gray-400">
        PNG, JPG, GIF up to 10MB
      </p>
    </div>
  )
}
