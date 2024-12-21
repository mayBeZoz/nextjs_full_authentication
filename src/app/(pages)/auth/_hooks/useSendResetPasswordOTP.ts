import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { sendResetPasswordEmailAction } from "../actions";


type TResponse = {
  message:string,
  success:boolean
  data: null
}
export function useSendResetPasswordOTP () {

  const { mutate:sendResetPasswordOTP, isLoading } = useMutation<TResponse, unknown, string>({
    mutationFn:(userEmail:string) => sendResetPasswordEmailAction(userEmail),
    mutationKey:['reset_password_otp'],
    onSettled:(res) => {
      if (res) {
        if (res.success) {
          toast.success(res.message)
        }else {
          toast.error(res.message)
        }
      }  
    }
  })

  return {
    sendResetPasswordOTP,
    isLoading
  }
}