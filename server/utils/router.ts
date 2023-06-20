import {router} from '../service/trpc';
import {userRouter} from "../service/user";



export const appRouter = router({
    create:userRouter,


});

export type AppRouter = typeof appRouter;
