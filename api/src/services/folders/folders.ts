import type {
  QueryResolvers,
  MutationResolvers,
  FolderRelationResolvers,
} from 'types/graphql'

import { EXPIRES_IN } from '@redwoodjs/uploads/signedUrl'

import { db } from 'src/lib/db'
import { uploadsProcessors } from 'src/lib/uploads'

export const folders: QueryResolvers['folders'] = () => {
  return db.folder.findMany()
}

export const folder: QueryResolvers['folder'] = async ({ id }) => {
  const f = await db.folder.findUnique({
    where: { id },
  })

  return f
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
  const processedInput = await uploadsProcessors.processFileList(input.files)
  const mappedFiles = processedInput.map((path) => ({ path }))

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
  files: async (_obj, { root }) => {
    // @MARK: Cannot do this because files is a relation
    // https://github.com/prisma/prisma/issues/20091

    // const files = await db.folder
    //   .findUnique({ where: { id: root?.id } })
    //   .files()

    const files = await db.file.findMany({
      where: {
        folderId: root?.id,
      },
    })

    return files.map((file) =>
      file.withSignedUrl({
        // For demonstration!
        expiresIn: EXPIRES_IN.days(15),
      })
    )
  },
}
