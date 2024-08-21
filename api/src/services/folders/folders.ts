import type {
  QueryResolvers,
  MutationResolvers,
  FolderRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { fileListProcessor } from 'src/lib/uploads'

export const folders: QueryResolvers['folders'] = () => {
  return db.folder.findMany()
}

export const folder: QueryResolvers['folder'] = ({ id }) => {
  return db.folder.findUnique({
    where: { id },
  })
}

export const createFolder: MutationResolvers['createFolder'] = ({ input }) => {
  return db.folder.create({
    data: input,
  })
}

export const updateFolder: MutationResolvers['updateFolder'] = async ({
  id,
  input,
}) => {
  console.log('Iput file', input.files)
  const processedInput = await fileListProcessor(input.files)
  const mappedFiles = processedInput.map((path) => ({ path }))
  console.log(`👉 \n ~ mappedFiles:`, mappedFiles)

  return db.folder.update({
    data: {
      ...input,
      files: {
        createMany: {
          data: mappedFiles,
        },
      },
    },
    where: { id },
  })
}

export const deleteFolder: MutationResolvers['deleteFolder'] = ({ id }) => {
  return db.folder.delete({
    where: { id },
  })
}

export const Folder: FolderRelationResolvers = {
  files: (_obj, { root }) => {
    return db.folder.findUnique({ where: { id: root?.id } }).files()
  },
}
