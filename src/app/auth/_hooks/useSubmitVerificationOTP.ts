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
            if (res) {
                if (res.success) {
                    router.push("/auth/login")
                    toast.success(res.message)
                } else if (res.data?.verified) {
                    router.push("/auth/login")
                     toast.error(res.message)
                } else {
                    toast.error(res.message)
                }
            }
        }
    })

    return {
        submitAccountVerificationOTP,
        isAccountVerificationLoading
    }
}