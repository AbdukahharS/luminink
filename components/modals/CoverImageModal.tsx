'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from 'convex/react'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import useCoverImage from '@/hooks/useCoverImage'
import { SingleImageDropzone } from '@/components/SingleImageDropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

const CoverImageModal = () => {
  const params = useParams()
  const coverImage = useCoverImage()
  const { edgestore } = useEdgeStore()
  const update = useMutation(api.documents.update)

  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
      })

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      })

      onClose()
    }
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className='w-full outline-none'
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CoverImageModal
