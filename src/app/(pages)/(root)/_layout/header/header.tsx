import { Button } from '@/components/ui/button'
import { configurations } from '@/lib/config'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import ProfileButton from './profile-button'

async function Header() {
  const { get } = await cookies()
  const isAuth = Boolean(get("access_token"))

  return (
    <header className='w-full flex h-[80px] items-center'>
      <div className="container flex items-center w-full justify-between">
        <h1 className='bg-gray-200 font-bold rounded-lg p-2'>{configurations.app_name}</h1>
        <nav>
          {
            isAuth ? (
              <ProfileButton/>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth/login">
                  <Button variant="default">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="default">
                    Register
                  </Button>
                </Link>
              </div>
            ) 
          }
        </nav>
      </div>
    </header>
  )
}

export default Header