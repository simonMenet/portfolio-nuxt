import type { Artwork, Series } from '~/types/catalogue'
import { mockArtworks, mockSeries } from '~/data/mock'

const artworksQuery = `*[_type == "artwork"] | order(year desc){
  "id": coalesce(slug.current, _id),
  title,
  "seriesId": series->slug.current,
  year,
  technique,
  dimensions,
  "images": {
    "vue_principale": vue_principale.asset->url,
    "vue_detail": vue_detail.asset->url,
    "vue_situation": vue_situation.asset->url
  },
  status
}`

const seriesQuery = `*[_type == "series"] | order(year desc){
  "id": coalesce(slug.current, _id),
  title,
  year,
  statement,
  "artworkIds": artworks[]->slug.current
}`

export function useCatalogue() {
  const config = useRuntimeConfig().public
  const projectId = config.sanityProjectId as string

  if (!projectId) {
    return {
      artworks: ref<Artwork[]>(mockArtworks),
      series: ref<Series[]>(mockSeries),
    }
  }

  const base = `https://${projectId}.apicdn.sanity.io/v${config.sanityApiVersion}/data/query/${config.sanityDataset}`

  const fetchSanity = async <T>(query: string, fallback: T): Promise<T> => {
    try {
      const res = await $fetch<{ result: T }>(base, {
        params: { query },
        timeout: 8000,
      })
      return res.result ?? fallback
    } catch {
      return fallback
    }
  }

  const { data: artworks } = useAsyncData(
    'catalogue-artworks',
    () => fetchSanity<Artwork[]>(artworksQuery, mockArtworks),
    { default: () => [] as Artwork[] },
  )

  const { data: series } = useAsyncData(
    'catalogue-series',
    () => fetchSanity<Series[]>(seriesQuery, mockSeries),
    { default: () => [] as Series[] },
  )

  return { artworks, series }
}