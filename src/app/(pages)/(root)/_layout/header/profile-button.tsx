'use client'

import { useLogout } from "@/app/(pages)/auth/_hooks/useLogout"
import { fadeInOut } from "@/lib/animations"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IoMdSettings } from "react-icons/io"
import { MdOutlineLogout } from "react-icons/md"
import { useGetUser } from "../hooks/useGetUser"
import Link from "next/link"

const animation = fadeInOut({
  enter_duration:.2,
  exit_duration:.1
})

function ProfileButton() {

  const { data, isLoading } = useGetUser()
  const { logout } = useLogout()

  const [ showList, setShowList ] = useState<boolean>(false)

  return (
    <div className="relative">
      <button 
        onClick={()=> setShowList(prev => !prev)}
        className="w-[50px] aspect-square rounded-full overflow-hidden"
      >
        <img 
          className='w-full h-full' 
          src="/assets/profile.png" 
          alt="profile image" 
        />
      </button>
      <AnimatePresence>
        {
          showList ? (
            <motion.div 
              key="header-list"
              className="flex border rounded-md overflow-hidden bg-zinc-100 w-[220px] flex-col absolute top-[60px] right-0"
              {...animation}
            >
              <h5 className="mt-2 mb-1 ml-4 text-sm text-zinc-500 font-semibold">User Profile</h5>
              <ul className="pl-4 pb-3 text-sm font-medium">
                <li className={`${isLoading ? "loading_text w-full h-4 mb-1" : ""}`}>{data?.first_name} {data?.last_name}</li>
                <li className={`${isLoading ? "loading_text w-full h-4" : ""}`}>{data?.email}</li>
              </ul>
              <span className="h-[1px] bg-zinc-200 w-full"/>
              <ul>
                <h5 className="mt-2 ml-4 mb-1 text-sm text-zinc-500 font-semibold">Manage Account</h5>
                <li>
                  <Link className="header_list_item" href='/settings/account'>
                    <IoMdSettings />
                    Account
                  </Link>
                </li>
                <li>
                  <div className="header_list_item" onClick={logout}>
                    <MdOutlineLogout />
                    Logout
                  </div>
                </li>
              </ul>
            </motion.div>
          ) :<></>
        }
      </AnimatePresence>
    </div>
  )
}

export default ProfileButton


