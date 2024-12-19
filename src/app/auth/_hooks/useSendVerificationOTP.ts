import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { sendVerificationEmailAction } from "../actions";
import { useRouter } from "next/navigation";


type TResponse = {
    message:string,
    success:boolean
    data: null | {
        verified: boolean
    }
}
export function useSendVerificationOTP () {
    const router = useRouter()

    const { mutate:sendVerificationOTP, isLoading } = useMutation<TResponse, unknown, string>({
        mutationFn:(userEmail:string) => sendVerificationEmailAction(userEmail),
        mutationKey:['send_account_verification_otp'],
        onSettled:(res) => {
            if (res) {
                if (res.success) {
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
        sendVerificationOTP,
        isLoading
    }
}