import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: Int
        username: String
        email: String
        password: String
        permission: Permission
        token: String
    }
    enum Permission {
        NORMAL
        ADVANCE
        ADMIN
        SUPERADMIN
    }
    type Blog {
        id: Int
        title: String
        outline: String
        content: String
        author: String
        viewCount: Int
        created_time: String
    }
    type Query {
        me: User
        getBlogList: [Blog]
        getBlog(id: Int!): Blog
    }
    type Mutation{
        login(user: String!, password: String!): User
        register(email: String!, username: String!, verifyCode:String!, password: String!): User
        sendVerifyCode(email:String!): Int
        createBlog(title: String!, outline: String!, content: String!, author: String!): Blog
    }
`;