'use client'

import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'

import { Spinner } from '@/components/Spinner'
import { SearchCommand } from '@/components/SearchCommand'

import Navigation from './_components/Navigation'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect('/')
  }

  return (
    <div className='h-full flex dark:ng-[#1f1f1f]'>
      <Navigation />
      <main className='h-full flex-1 overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
