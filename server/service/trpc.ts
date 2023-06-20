import {inferAsyncReturnType, initTRPC, TRPCError} from '@trpc/server';
import type {CreateExpressContextOptions} from '@trpc/server/adapters/express';
import superjson from 'superjson';
import {prisma} from '../prisma/prisma';


export const createContext = (opts: CreateExpressContextOptions) => {

    const session = opts.req.session;

    return {
        session,
        req: opts.req,
        res: opts.res,
        prisma: prisma
    };
};
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

export const router = t.router;

export const publicProcedure = t.procedure;

