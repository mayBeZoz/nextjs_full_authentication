import { useMutation } from "react-query";
import { registerAction } from "../actions";
import { z } from "zod";
import { registerSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";

type TRegisterPayload = z.infer<typeof registerSchema>

type TResponse = {
    message:string,
    success:boolean
    data: {
        verified:boolean,
        email:string
    } | null,
}


export function useRegister () {

    const router = useRouter()

    const { mutate, isLoading } = useMutation({
        mutationFn:(payload:TRegisterPayload) => registerAction(payload),
        mutationKey:['register'],
        retry:0,
        onSettled(res:TResponse) {
            const info = res.data

            if (res.success) {
                router.push("/auth/login")
            }else if (info) {
                if (info.verified) {
                    router.push("/auth/login")
                }else {
                    router.push(`/auth/verify-account/${info.email}`)
                }
            }
        },
    })
    return {
        registerFn:mutate,
        isLoading
    }
}