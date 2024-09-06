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
  secret: 'xxx_my_sekret',
  endpoint: '/signedUrl',
})

const { saveFiles, storagePrismaExtension } = setupStorage({
  uploadsConfig,
  storageAdapter: fsStorage,
  urlSigner,
})

export { saveFiles, storagePrismaExtension }
