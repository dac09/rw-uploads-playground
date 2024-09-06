export const schema = gql`
  type UploadCheckResult {
    contents: String
    fileName: String
    fileType: String
  }

  type Mutation {
    checkUpload(upload: File!): UploadCheckResult @skipAuth
  }
`
