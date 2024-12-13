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
            if (!res) return  
            if (res.success)             
            return toast.success(res.message)
            if (res.data?.verified) {
                router.push("/auth/login")
                return toast.error(res.message)
            }
            toast.error(res.message)
        }
    })

    return {
        sendVerificationOTP,
        isLoading
    }
}