import type { Artwork, Series } from '~/types/catalogue'
import { mockArtworks, mockSeries } from '~/data/mock'

// Les requêtes GROQ sont dans server/api/catalogue.get.ts : le navigateur appelle
// uniquement ce même domaine (pas de CORS), le serveur interroge Sanity.
export function useCatalogue() {
  const config = useRuntimeConfig().public
  const projectId = config.sanityProjectId as string

  if (!projectId) {
    return {
      artworks: ref<Artwork[]>(mockArtworks),
      series: ref<Series[]>(mockSeries),
    }
  }

  const { data: artworks, error: artworksError, refresh: refreshArtworks } = useAsyncData(
    'catalogue-artworks',
    () => $fetch<Artwork[]>('/api/catalogue', { params: { type: 'artworks' }, retry: 2, retryDelay: 400 }),
    { default: () => [] as Artwork[] },
  )

  const { data: series, error: seriesError, refresh: refreshSeries } = useAsyncData(
    'catalogue-series',
    () => $fetch<Series[]>('/api/catalogue', { params: { type: 'series' }, retry: 2, retryDelay: 400 }),
    { default: () => [] as Series[] },
  )

  // Filet de sécurité : si le rendu serveur a échoué ou renvoyé une liste vide,
  // on relance depuis le navigateur au lieu d'attendre un Ctrl+R.
  onMounted(() => {
    if (artworksError.value || !artworks.value?.length) refreshArtworks()
    if (seriesError.value || !series.value?.length) refreshSeries()
  })

  return { artworks, series }
}