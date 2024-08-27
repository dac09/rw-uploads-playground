import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { uploadsProcessors } from 'src/lib/uploads'

export const profiles: QueryResolvers['profiles'] = () => {
  return db.profile.findMany()
}

export const profile: QueryResolvers['profile'] = async ({ id }) => {
  const profile = await db.profile.findUnique({
    where: { id },
  })

  // Convert the avatar and coverPhoto fields to signed URLs
  return profile?.withSignedUrl()
}

export const updateProfile: MutationResolvers['updateProfile'] = async ({
  id,
  input,
}) => {
  console.log('Avatar input', input.avatar)
  const processedInput = await uploadsProcessors.processProfileUploads(input)

  // This becomes a string 👇
  // processedInput.avatar = '/DEFAULT_SAVE_PATH/generatedId.jpg'

  return db.profile.update({
    data: processedInput,
    where: { id },
  })
}

export const deleteProfile: MutationResolvers['deleteProfile'] = ({ id }) => {
  return db.profile.delete({
    where: { id },
  })
}
