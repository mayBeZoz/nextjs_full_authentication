"use client"

import { TChildren } from "@/types";
import TanstackProvider from "./tanstack-provider";

export default function Providers ({ children }: TChildren) {
    return (
        <TanstackProvider>
            {children}
        </TanstackProvider>
    )
}