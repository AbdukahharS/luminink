'use client'

import Image from 'next/image'
import { ImageIcon, X } from 'lucide-react'
import { useMutation } from 'convex/react'
import { useParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import useCoverImage from '@/hooks/useCoverImage'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useEdgeStore } from '@/lib/edgestore'

interface CoverProps {
  url?: string
  preview?: boolean
}

const Cover = ({ url, preview }: CoverProps) => {
  const { edgestore } = useEdgeStore()
  const params = useParams()
  const coverImage = useCoverImage()
  const removeCover = useMutation(api.documents.removeCover)

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url })
    }
    removeCover({ id: params.documentId as Id<'documents'> })
  }

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && <Image src={url} fill alt='Cover' className='object-cover' />}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            onClick={() => coverImage.onReplace(url)}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <X className='h-4 w-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cover
