import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { DataCenter } from './datasources/database';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

// const db = new Pool({
//     ...config.database,
//     max: 10, //TODO: should use a constant here
// });

async function startApolloServer() {
    const server = new ApolloServer({
        context: async({req}) => {
            const auth = req.headers && req.headers.authorization || '';
            return {user: {
                id: 1,
                email: 'email.@email.com',
                username: 'username',
                password: '123456',
                permission: 'SUPERADMIN'
            }};
        },
        typeDefs,
        resolvers,
        dataSources: () => ({
            // dataCenter: new DataCenter({ db }),
        }),
    });
    await server.start();
    const app = express();
    server.applyMiddleware({ app });
    await new Promise<void>((resolve) => {
        app.listen(4000, resolve);
    });
    console.log(`server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch((e) => {
    console.log('ERROR on startApolloServer: ', e);
})