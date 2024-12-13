import { TChildren } from "@/types";
import { Toaster } from "react-hot-toast";

export function ToastProvider ({ children }: TChildren) {
    return (
        <>
            { children }
            <Toaster
                position="top-center"
                reverseOrder={true}
                toastOptions={{
                    duration:3000,
                    className:"capitalize"
                }}
            />
        </>
    )
}