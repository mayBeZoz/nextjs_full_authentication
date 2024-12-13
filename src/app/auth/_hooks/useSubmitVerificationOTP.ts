import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { submitVerificationOTPAction } from "../actions";
import toast from "react-hot-toast";
import { z } from "zod";
import { verifyAccountSchema } from "@/lib/schemas";

type TResponse = {
    message: string,
    success: boolean,
    data: null | {
        verified: boolean
    }
}

type TAccountVerificationPayload = z.infer<typeof verifyAccountSchema>
export function useSubmitVerificationOTP () {
    
    const router = useRouter()

    const {
        mutate:submitAccountVerificationOTP,
        isLoading:isAccountVerificationLoading 
    } = useMutation<TResponse,unknown,TAccountVerificationPayload>({
        mutationFn: (payload) => submitVerificationOTPAction(payload),
        mutationKey:['submit_verification_otp'],
        onSettled: (res) => {
            if (!res) return  
            if (res.success) {
                router.push("/auth/login")
                return toast.success(res.message)
            }             
            if (res.data?.verified) {
                router.push("/auth/login")
                return toast.error(res.message)
            }
            toast.error(res.message)
        }
    })

    return {
        submitAccountVerificationOTP,
        isAccountVerificationLoading
    }
}