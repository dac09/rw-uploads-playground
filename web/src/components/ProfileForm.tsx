import { UserCircleIcon } from '@heroicons/react/20/solid'
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
  useForm,
} from '@redwoodjs/forms'
import { useBlocker } from '@redwoodjs/router'

import { UploadDropZone } from 'src/components/UploadDropZone'

type FormProfile = NonNullable<EditProfileById['profile']>

interface ProfileFormProps {
  profile?: EditProfileById['profile']
  onSave: (data: UpdateProfileInput, id?: FormProfile['id']) => void
  error: RWGqlError
  loading: boolean
}

const ProfileForm = (props: ProfileFormProps) => {
  const onSubmit = (data: FormProfile) => {
    console.log(data)
    const singleFileAvatar = {
      ...data,
      avatar: data.avatar?.[0],
    }
    props.onSave(singleFileAvatar, props?.profile?.id)
  }

  const formMethods = useForm()
  const blocker = useBlocker({
    when: formMethods.formState.isDirty,
  })

  return (
    <>
      {blocker.state === 'BLOCKED' ? (
        <div>
          <button type="button" onClick={() => blocker.confirm()}>
            Confirm
          </button>
          <button type="button" onClick={() => blocker.abort()}>
            Abort
          </button>
        </div>
      ) : null}
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
            {props.profile.avatar ? (
              <img
                alt="Avatar"
                src={props.profile.avatar}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <UserCircleIcon
                aria-hidden="true"
                className="h-12 w-12 text-gray-500"
              />
            )}
            <FileField
              name="avatar"
              className="file:rounded-md file:bg-white/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white file:shadow-sm hover:file:bg-white/20"
              errorClassName="rw-input rw-input-error"
            />

            <FieldError name="avatar" className="rw-field-error" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <div className="grid grid-cols-2 gap-x-6">
                <div>
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
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      validation={{ required: true }}
                    />

                    <FieldError name="firstName" className="rw-field-error" />
                  </div>
                </div>
                <div>
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
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      validation={{ required: true }}
                    />

                    <FieldError name="lastName" className="rw-field-error" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-white"
            >
              Cover photo
            </label>
            <UploadDropZone
              name="coverPhoto"
              label="Cover photo"
              originalImgSrc={props.profile.coverPhoto}
            />
            <FieldError name="coverPhoto" className="rw-field-error" />
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </button>
            <Submit
              onSubmit={onSubmit}
              disabled={props.loading}
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Save
            </Submit>
          </div>
        </div>
      </Form>
    </>
  )
}

export default ProfileForm
