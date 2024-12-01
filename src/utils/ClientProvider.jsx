"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react';
import React, { useState } from 'react'

const ClientProvider = ({children}) => {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
    )
}

export default ClientProvider
