import { TChildren } from "@/types"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export default function TanstackProvider ({ children }: TChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    )
}