import { useQuery } from "react-query";
import axios from "axios"
import { IUser } from "@/types";


type TResponse = {
  data: IUser | null,
  message: string,
  success: boolean
}
export function useGetUser () {
  const { data, isLoading } = useQuery<TResponse>({
    queryKey:['get_user'],
    queryFn: async () => {
      const res = await axios.get("/api/users/user-info",{
        withCredentials: true
      })
      return res.data
    }
  })

  return {
    data:data?.data, 
    isLoading
  }
}