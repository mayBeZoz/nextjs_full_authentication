import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { submitResetPasswordOTPAction } from "../actions";
import toast from "react-hot-toast";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/schemas";

type TResponse = {
  message: string,
  success: boolean,
  data: null
}

type TResetPasswordPayload = z.infer<typeof resetPasswordSchema>
export function useSubmitResetPasswordOTP () {
  
  const router = useRouter()

  const {
    mutate:submitResetPasswordOTP,
    isLoading:isResitingPasswordLoading 
  } = useMutation<TResponse,unknown,TResetPasswordPayload>({
    mutationFn: (payload) => submitResetPasswordOTPAction(payload),
    mutationKey:['submit_reset_password_otp'],
    onSettled: (res) => {
      if (res) {
        if (res.success) {
          router.push("/auth/login")
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      }
    }
  })

  return {
    submitResetPasswordOTP,
    isResitingPasswordLoading
  }
}