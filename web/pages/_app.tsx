import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import {trpc} from '../lib/trpc';
import {AppProps} from 'next/app';
import superjson from 'superjson';

import "bootstrap/dist/css/bootstrap.min.css";


import {getCurrentHostWithPortAndProtocol} from "../lib/utils";


export default function App({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            transformer: superjson,
            links: [
                httpBatchLink({
                    url: `${getCurrentHostWithPortAndProtocol()}/trpc`,
                    fetch(url, options) {
                        return fetch(url, {
                            ...options,
                            credentials: 'include',
                        });
                    }
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </trpc.Provider>
    );
}
