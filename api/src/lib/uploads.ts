import { UploadsConfig, setupStorage } from '@redwoodjs/storage'
import { FileSystemStorage } from '@redwoodjs/storage/FileSystemStorage'
import { UrlSigner } from '@redwoodjs/storage/UrlSigner'

const uploadsConfig: UploadsConfig = {
  profile: {
    fields: ['avatar', 'coverPhoto'],
  },
  file: {
    fields: ['path'],
  },
}

export const fsStorage = new FileSystemStorage({
  baseDir: './uploads',
})

export const urlSigner = new UrlSigner({
  // secret: process.env.UPLOADS_SECRET,
  secret: 'xxx_my_sekret',
  endpoint: '/signedUrl',
})

const { filesToStorage, storagePrismaExtension } = setupStorage({
  uploadsConfig,
  storageAdapter: fsStorage,
  urlSigner,
})

export { filesToStorage, storagePrismaExtension }
