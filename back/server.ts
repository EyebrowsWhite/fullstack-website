import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { DataCenter } from './datasources/database';
import jwt from 'jsonwebtoken';
import config from './config';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const BACKEND_PORT = parseInt(process.env['BACKEND_PORT'] || '9998');

const db = new Pool({
    ...config.database,
    max: 10, //TODO: should use a constant here
});

async function startApolloServer() {
    const server = new ApolloServer({
        context: async({req}) => {
            const auth = req.headers && req.headers.authorization || '';
            try {
                const decode = jwt.verify(auth, config.secretOrPrivateKey);
                const { rows } = await db.query(
                    `select id, username, email, permission from
                        "user"
                    where username = $1 and email = $2`,
                    [(<any>decode).username, (<any>decode).email],
                );
                if (rows[0]) {
                    return {
                        user: rows[0]
                    };
                }
            } catch (e) {}
            return { user: null };
        },
        typeDefs,
        resolvers,
        dataSources: () => ({
            dataCenter: new DataCenter({ db }),
        }),
    });
    await server.start();
    const app = express();
    server.applyMiddleware({ app });
    await new Promise<void>((resolve) => {
        app.listen(BACKEND_PORT, resolve);
    });
    console.log(`server ready at http://localhost:${BACKEND_PORT}${server.graphqlPath}`);
}

startApolloServer().catch((e) => {
    console.log('ERROR on startApolloServer: ', e);
})