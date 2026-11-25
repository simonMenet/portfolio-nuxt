export interface Artwork {
  id: string
  title: string
  seriesId?: string
  year: number
  technique: string
  dimensions: string
  price?: number | null
  images: {
    vue_principale?: string
    vue_situation?: string
    vue_detail?: string
    vue_detail_2?: string
    vue_detail_3?: string
  }
  status: 'available' | 'reserved' | 'private_collection'
}

export interface Series {
  id: string
  title: string
  year: number
  statement: string
  artworkIds: string[]
}