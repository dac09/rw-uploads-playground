export const schema = gql`
  ### NOTE! I'm calling it MyFile, so it doesn't clash with the File scalar
  type MyFile {
    id: Int!
    path: String!
    folderId: Int
    # folder: Folder
  }

  type Query {
    files: [MyFile!]! @requireAuth
    file(id: Int!): MyFile @requireAuth
  }

  input CreateFileInput {
    path: File!
    folderId: Int!
  }

  type Mutation {
    createFile(input: CreateFileInput!): MyFile! @requireAuth
    deleteFile(id: Int!): MyFile! @requireAuth
  }
`
