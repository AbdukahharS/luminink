'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Illuminate Your Ideas, Capture Your Creativity. Welcome to{' '}
        <span className='underline'>LuminInk</span>
      </h1>
      <h3 className='text-base sm:text-lg md:text-2xl font-medium'>
        LuminInk is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Button>
        Enter LuminInk <ArrowRight className='h-4 w-4 ml-2' />
      </Button>
    </div>
  )
}

export default Heading
