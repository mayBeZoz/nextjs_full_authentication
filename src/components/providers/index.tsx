"use client"

import { TChildren } from "@/types";
import TanstackProvider from "./tanstack-provider";
import { ToastProvider } from "./toast-provider";

export default function Providers ({ children }: TChildren) {
    return (
        <TanstackProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </TanstackProvider>
    )
}