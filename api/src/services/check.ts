import { MutationResolvers } from 'types/graphql'

export const checkUpload: MutationResolvers['checkUpload'] = async ({
  upload,
}) => {
  console.log(upload)

  return {
    fileName: upload.name,
    contents: await upload.text(),
    fileType: upload.type,
  }
}
