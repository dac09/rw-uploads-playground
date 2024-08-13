export const schema = gql`
  type Profile {
    id: Int!
    firstName: String!
    lastName: String!
    coverPhoto: String
    avatar: String
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: Int!): Profile @requireAuth
  }

  # input CreateProfileInput {
  #   firstName: String!
  #   lastName: String!
  #   coverPhoto: String
  #   avatar: String
  # }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    coverPhoto: String
    avatar: String
  }

  type Mutation {
    # createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: Int!, input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
