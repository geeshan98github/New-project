import 'regenerator-runtime/runtime.js';
import {createExpressMiddleware} from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import {createContext} from '../service/trpc';
import {appRouter} from './router';
import multer from 'multer';
import * as path from 'path';
import 'express-session';
import session from 'express-session';
import {env} from './env';
import {hourInMs} from './server-utils';


// const MemoryStore = require('memorystore')(session);
const SQLiteStore = require('connect-sqlite3')(session);

const app = express();


app.use(cors({
        origin: [
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3000',
            '*',
        ],
        credentials: true,
    },
));

declare module 'express-session' {
    interface SessionData {
        user?: {
            username: string;
            expires: Date;
            isAdmin?: boolean;
        };
    }
}
//session
app.use(session({
    secret: 'secret$%^1334',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: env.isDevelopment ? hourInMs(24 * 2) : hourInMs(6),
    },
    // store: new MemoryStore({
    //     checkPeriod: 86400000,
    // }),
    store: new SQLiteStore,
}));

app.use(
    '/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);


app.listen(env.port, () => {
    console.log('Listening on port ' + env.port + '...');
});

