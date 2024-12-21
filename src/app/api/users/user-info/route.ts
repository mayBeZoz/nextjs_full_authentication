import { decodeAuthToken } from "@/lib/utils/auth";
import { getUserById } from "@/services/query-services/user";
import { TAccessTokenPayload } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET () {
  const { get } = await cookies()
  const accessToken = get("access_token")

  if (!accessToken?.value) {
    return NextResponse.json({
      success:false,
      data:null,
      message:"Cannot Get User Data, No Token Provided"
    },{ status:401 })
  }

  const decoded = decodeAuthToken(accessToken.value) as TAccessTokenPayload

  try {
    const user = await getUserById(decoded.user_id)
    if (!user) {
      return NextResponse.json({
        success:false,
        data:null,
        message:"Cannot Get User Data, No Token Provided"
      },{ status: 404 })
    }
  
    return NextResponse.json({
      success:true,
      data:user,
      message:"Got User Successfully"
    },{ status: 200 })
  } catch {
    return NextResponse.json({
      success:false,
      data:null,
      message: "Server Error Occur, Please Try Again"
    },{ status: 500 })
  }
}