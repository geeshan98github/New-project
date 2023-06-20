import {createTRPCReact} from '@trpc/react-query';

import type {AppRouter} from 'server/utils/router';

export const trpc = createTRPCReact<AppRouter>();