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
  console.log(`👉 \n ~ profile?.withSignedUrl():`, profile?.withSignedUrl())

  // return profile
  return profile?.withSignedUrl()
}

// export const createProfile: MutationResolvers['createProfile'] = ({
//   input,
// }) => {
//   return db.profile.create({
//     data: input,
//   })
// }

export const updateProfile: MutationResolvers['updateProfile'] = async ({
  id,
  input,
}) => {
  const processedInput = await uploadsProcessors.processProfileUploads(input)
  console.log(`👉 \n ~ processedInput:`, processedInput)

  // This is a string 👇
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
