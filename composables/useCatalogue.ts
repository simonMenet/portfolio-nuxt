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

  // Quand Sanity est configuré, on ne bascule JAMAIS sur les mocks :
  // on réessaie, puis on laisse l'erreur remonter (le client retentera).
  const fetchSanity = async <T>(query: string, attempts = 3): Promise<T> => {
    let lastError: unknown
    for (let n = 0; n < attempts; n++) {
      try {
        const res = await $fetch<{ result: T }>(base, {
          params: { query },
          timeout: 8000,
        })
        if (res.result == null) throw new Error('Réponse Sanity vide')
        return res.result
      } catch (e) {
        lastError = e
        if (n < attempts - 1) await new Promise(r => setTimeout(r, 300 * (n + 1)))
      }
    }
    console.error('[useCatalogue] Échec de la requête Sanity', lastError)
    throw lastError
  }

  const { data: artworks, error: artworksError, refresh: refreshArtworks } = useAsyncData(
    'catalogue-artworks',
    () => fetchSanity<Artwork[]>(artworksQuery),
    { default: () => [] as Artwork[] },
  )

  const { data: series, error: seriesError, refresh: refreshSeries } = useAsyncData(
    'catalogue-series',
    () => fetchSanity<Series[]>(seriesQuery),
    { default: () => [] as Series[] },
  )

  // Si le rendu serveur a échoué, on relance la requête depuis le navigateur
  // au lieu de rester bloqué jusqu'à un rechargement manuel (Ctrl+R).
  // On relance aussi si la liste est simplement vide (payload SSR vide sans erreur).
  onMounted(() => {
    if (artworksError.value || !artworks.value?.length) refreshArtworks()
    if (seriesError.value || !series.value?.length) refreshSeries()
  })

  return { artworks, series }
}