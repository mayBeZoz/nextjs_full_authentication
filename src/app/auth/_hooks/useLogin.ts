import { useRouter } from "next/navigation"
import { useMutation } from "react-query"
import { loginAction } from "../actions"
import toast from "react-hot-toast"

type TLoginPayload = {
    email: string,
    password: string
}


type TResponse = {
    message:string,
    success:boolean
    data: {
        verified:boolean,
        email:string
    } | null,
}

export function useLogin () {
    const router = useRouter()

    const { mutate, isLoading } = useMutation<TResponse, unknown, TLoginPayload>({
        mutationFn:(payload:TLoginPayload) => loginAction(payload),
        retry:0,
        onSettled(res) {
            if (!res) return 
            if (res.success) {
                toast.success(res.message)
                router.push("/")
            }
            if (res.data && !res.data.verified) {
                router.push(`/auth/verify-account?email=${res.data.email}`)
            }
            toast.error(res.message)
        },
    })
    return {
        loginFn:mutate,
        isLoading
    }
}