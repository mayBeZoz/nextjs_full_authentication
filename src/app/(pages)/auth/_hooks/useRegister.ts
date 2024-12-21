import { useMutation } from "react-query";
import { registerAction } from "../actions";
import { z } from "zod";
import { registerSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

    const { mutate, isLoading } = useMutation<TResponse, unknown, TRegisterPayload>({
        mutationFn:(payload) => registerAction(payload),
        mutationKey:['register'],
        retry:0,
        onSettled(res) {    
            if (!res) return 
            const info = res.data
            
            if (info) {
                if (res.success) {
                    toast.success("Your Account Created Successfully")
                    return router.push(`/auth/verify-account?email=${info.email}`)
                }else {
                    if (info.verified) {
                        router.push("/auth/login")
                    }else {
                        router.push(`/auth/verify-account?email=${info.email}`)
                    }
                }
                
            }
            toast.error(res.message)
        },
    })
    return {
        registerFn:mutate,
        isLoading
    }
}