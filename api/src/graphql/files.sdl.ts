export const schema = gql`
  type MyFile {
    id: Int!
    path: String!
    folderId: Int!
    folder: Folder!
  }

  type Query {
    files: [MyFile!]! @requireAuth
    file(id: Int!): MyFile @requireAuth
  }

  input CreateFileInput {
    path: File!
    folderId: Int!
  }

  input UpdateFileInput {
    path: File
    folderId: Int
  }

  type Mutation {
    createFile(input: CreateFileInput!): File! @requireAuth
    updateFile(id: Int!, input: UpdateFileInput!): File! @requireAuth
    deleteFile(id: Int!): MyFile! @requireAuth
  }
`
