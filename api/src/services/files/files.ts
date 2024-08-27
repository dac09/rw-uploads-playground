import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { uploadsProcessors } from 'src/lib/uploads'

export const files: QueryResolvers['files'] = async () => {
  const files = await db.file.findMany()

  return files.map((file) => file.withSignedUrl())
}

export const file: QueryResolvers['file'] = async ({ id }) => {
  const file = await db.file.findUnique({
    where: { id },
  })

  return file?.withSignedUrl()
}

export const createFile: MutationResolvers['createFile'] = async ({
  input,
}) => {
  const processedInput = await uploadsProcessors.processFileUploads(input)

  return db.file.create({
    data: processedInput,
  })
}

export const deleteFile: MutationResolvers['deleteFile'] = ({ id }) => {
  return db.file.delete({
    where: { id },
  })
}
