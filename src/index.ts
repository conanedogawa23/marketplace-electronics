/** Library imports */
import express from 'express';
import cors from 'cors';
import http from 'http';

import { connect } from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import 'dotenv/config'; // for environment variables

/** user file imports */
import { resolvers } from './resolvers.ts';
import authenticate from './middleware/auth.ts';
import { typeDefs } from './typeDefs.ts';
import { fileController } from './controller/file.controller.ts';
import integratorRoute from './routes/integrator.route.ts';

const app = express();

const httpServer = http.createServer(app);

/**
 * The ApolloServer constructor requires two parameters: your schema
 * definition and your set of resolvers.
 */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    csrfPrevention: true,
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }) // Use Apollo Sandbox
    ]
});

async function startServer() {
    // Connect to MongoDB
    await connect(process.env.DB_URL as string)
    await server.start();

    app.use(
        '/graphql',
        cors(),
        // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
        express.json({ limit: '50mb' }),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req, res }): Promise<any> => {
                try {
                    if (req.url === '/' && req.body.operationName === 'IntrospectionQuery') {
                        return { req, res }
                    }
                    if (req.body.query.includes('loginUser') && req.body.variables.password) {
                        return { req, res }
                    }
                    const { user } = await authenticate({ req })
                    return { req, res, user };
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    );

    app.use(cors());

    app.post('/files/upload', fileController);

    app.use('/scripts/integrator', integratorRoute);

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer()