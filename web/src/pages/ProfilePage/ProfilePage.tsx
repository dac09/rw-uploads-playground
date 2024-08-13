import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import EditProfileCell from 'src/components/EditProfileCell'

const ProfilePage = () => {
  return (
    <>
      <Metadata title="Profile" description="Profile page" />

      <EditProfileCell id={1} />
    </>
  )
}

export default ProfilePage
