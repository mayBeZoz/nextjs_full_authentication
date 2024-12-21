import { TChildren } from '@/types'
import React from 'react'
import Header from './_layout/header/header'

function MainLayout({ children }: TChildren) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default MainLayout