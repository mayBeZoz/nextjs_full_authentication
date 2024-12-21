import { useMutation } from "react-query";
import { logoutAction } from "../actions";
import { useRouter } from "next/navigation";

type TResponse = {
  data:null,
  message:string,
  success:boolean
}

export function useLogout () {

  const router = useRouter()

  const { mutate, isLoading } = useMutation<TResponse>({
    mutationKey:['logout'],
    mutationFn: logoutAction,
    onSettled:(res) => {
      if (res && res.success) {
        router.push('/auth/login')
      }
    }
  })

  return {
    logout:() => mutate(),
    isLoading
  }
}