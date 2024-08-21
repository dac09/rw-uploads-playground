export const schema = gql`
  ## IMPORTANT!!!!!
  scalar File

  type MyFile {
    id: Int!
    path: String!
  }

  type Folder {
    id: Int!
    name: String!
    # Weird but you can't call it File which is a scalar
    files: [MyFile]
  }

  type Query {
    folders: [Folder!]! @requireAuth
    folder(id: Int!): Folder @requireAuth
  }

  input CreateFolderInput {
    name: String!
  }

  input UpdateFolderInput {
    name: String
    files: [File]
  }

  type Mutation {
    createFolder(input: CreateFolderInput!): Folder! @requireAuth
    updateFolder(id: Int!, input: UpdateFolderInput!): Folder! @requireAuth
    deleteFolder(id: Int!): Folder! @requireAuth
  }
`
