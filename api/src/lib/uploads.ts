import { UploadsConfig } from '@redwoodjs/uploads'
import { setupUploads } from '@redwoodjs/uploads'
import { FileSystemStorage } from '@redwoodjs/uploads/FileSystemStorage'
import { UrlSigner } from '@redwoodjs/uploads/signedUrl'

const uploadConfig: UploadsConfig = {
  profile: {
    fields: ['avatar', 'coverPhoto'],
  },
  file: {
    fields: ['path'],
  },
}

export const storage = new FileSystemStorage({
  baseDir: './uploads',
})

export const urlSigner = new UrlSigner({
  // secret: process.env.UPLOADS_SECRET,
  secret: 'xxx_my_sekret',
  endpoint: '/signedUrl',
})

const { uploadsProcessors, prismaExtension, fileListProcessor } = setupUploads(
  uploadConfig,
  storage,
  urlSigner
)

export { uploadsProcessors, prismaExtension, fileListProcessor }
