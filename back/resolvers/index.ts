import jwt from 'jsonwebtoken';
import type { IResolvers } from '@graphql-tools/utils';
import { isEmail } from '../utils/isEmail';
import { sendVerifyCode } from '../auth/mail';
import { CUSTOM_ERROR } from '../magic';
import config from '../config';


export const resolvers:IResolvers | Array<IResolvers> = {
    Query: {
        me: (_, __, context) => {
            return context && context.user || null;
        },
        getBlogList: async (_, __, { dataSources }) => {
            const { rows } = await dataSources.dataCenter.db.query(
                `select
                    id, title, outline, author, view_count, created_time
                from "blog" order by created_time desc`,
            );
            return rows;
        },
        getBlog: async (_, { id }, { dataSources }) => {
            const { rows } = await dataSources.dataCenter.db.query(
                `select * from "blog" where id = $1`,
                [id],
            );
            return rows[0];
        }
    },
    Mutation: {
        login: async (_, { user, password }, { dataSources }) => {
            const { rows } = await dataSources.dataCenter.db.query(
                `select * from
                    "user"
                where ${isEmail(user) ? 'email' : 'username'} = $1 and password = $2`,
                [user, password],
            );
            if (rows[0]) {
                const res = {...rows[0], password: '********'};
                const token = jwt.sign(res, config.secretOrPrivateKey);
                return { ...res, token };
            }
        },
        register: async (_, { email, username, verifyCode, password }, { dataSources }) => {
            const { rows:verifiedEmail } = await dataSources.dataCenter.db.query(
                `select email from "verify_code" where email = $1 and code = $2`,
                [email, verifyCode],
            );
            if (verifiedEmail.length && verifiedEmail[0].email) {
                const { rows } = await dataSources.dataCenter.db.query(
                    `insert into
                        "user" (email, username, password)
                        values  ($1, $2, $3)
                        on conflict do nothing returning *`,
                    [email, username, password],
                );
                return rows[0];
            }
        },
        sendVerifyCode: async (_, { email }, { dataSources }) => {
            if (!isEmail(email)) {
                return CUSTOM_ERROR.INVALID_EMAIL;
            }
            const verifyCode = await sendVerifyCode(email);
            if (verifyCode === 'error') {
                return CUSTOM_ERROR.VERIFY_SEND_ERROR;
            } else {
                await dataSources.dataCenter.db.query(
                    `
                    insert into
                        "verify_code"(email, code)
                        values ($1, $2)
                    on conflict(email) do update set code = $2`,
                    [email, verifyCode]
                );
                return CUSTOM_ERROR.VERIFY_SUCCESS;
            }
        },
        createBlog: async (_, { title, outline, content, author }, context) => {
            if (context && context.user && context.user.permission === 'SUPERADMIN') {
                const { rows } = await context.dataSources.dataCenter.db.query(
                    `
                    insert into "blog" (title, outline, content, author)
                        values($1, $2, $3, $4)
                    returning *`,
                    [title, outline, content, author],
                );
                return rows[0];
            }
        }
    }
};