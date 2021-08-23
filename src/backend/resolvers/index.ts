import jwt from 'jsonwebtoken';
import type { IResolvers } from '@graphql-tools/utils';
import { isEmail } from '../../utils/isEmail';
import { sendVerifyCode } from '../auth/mail';
import { CUSTOM_ERROR } from '../../error';


export const resolvers:IResolvers | Array<IResolvers> = {
    Query: {
        me: (_, __, context) => {
            return {
                id: 1,
                email: 'email.@email.com',
                username: 'username',
                password: '123456',
                permission: 'SUPERADMIN'
            };
        },
        getBlogList: async (_, __, { dataSources }) => {
            
            return [{
                id: 1,
                title: 'title',
                outline: 'outline',
                content: 'content',
                author: 'eyebrow',
                created_time: '1629758033846'
            }];
        },
        getBlog: async (_, { id }, { dataSources }) => {
            return {
                id: 1,
                title: 'title',
                outline: 'outline',
                content: 'content',
                author: 'eyebrow',
                created_time: '1629758033846'
            };
        }
    },
    Mutation: {
        login: async (_, { user, password }, { dataSources }) => {
            return {
                id: 1,
                email: 'email.@email.com',
                username: 'username',
                password: '123456',
                permission: 'SUPERADMIN'
            }
        },
        register: async (_, { email, username, verifyCode, password }, { dataSources }) => {
            return {
                id: 1,
                email,
                username,
                password,
                permission: 'SUPERADMIN'
            }
        },
        sendVerifyCode: async (_, { email }, { dataSources }) => {
            return CUSTOM_ERROR.VERIFY_SUCCESS;
        },
        createBlog: async (_, { title, outline, content, author }, context) => {
            return {
                id: 1,
                title,
                outline,
                content,
                author,
                created_time: '1629758033846'
            };
        }
    }
};