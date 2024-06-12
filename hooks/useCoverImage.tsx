import { useEdgeStore } from '@/lib/edgestore'
import { create } from 'zustand'

type CoverImageStore = {
  url?: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onReplace: (url: string) => void
}

const useCoverImage = create<CoverImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url) => set({ isOpen: true, url }),
}))

export default useCoverImage
