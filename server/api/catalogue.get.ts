const artworksQuery = `*[_type == "artwork"] | order(year desc){
  "id": coalesce(slug.current, _id),
  title,
  "seriesId": series->slug.current,
  year,
  technique,
  dimensions,
  price,
  "images": {
    "vue_principale": vue_principale.asset->url,
    "vue_situation": vue_situation.asset->url,
    "vue_detail": vue_detail.asset->url,
    "vue_detail_2": vue_detail_2.asset->url,
    "vue_detail_3": vue_detail_3.asset->url
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

const homepageQuery = `*[_type == "homepage"][0]{
  "heroImage": heroImage.asset->url
}`

// Proxy serveur vers Sanity : le navigateur appelle uniquement ce même domaine,
// ce qui évite les erreurs CORS (403) de Sanity sur l'origine de production.
export default defineEventHandler(async (event) => {
  const type = getQuery(event).type
  const query =
    type === 'artworks'
      ? artworksQuery
      : type === 'series'
        ? seriesQuery
        : type === 'homepage'
          ? homepageQuery
          : null

  if (!query) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Paramètre "type" invalide',
    })
  }

  const config = useRuntimeConfig(event).public
  const projectId = config.sanityProjectId as string

  if (!projectId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Sanity non configuré',
    })
  }

  const base = `https://${projectId}.apicdn.sanity.io/v${config.sanityApiVersion}/data/query/${config.sanityDataset}`

  let lastError: unknown

  for (let n = 0; n < 3; n++) {
    try {
      const res = await $fetch<{ result: unknown }>(base, {
        params: { query },
        timeout: 8000,
      })

      if (res.result == null) {
        throw new Error('Réponse Sanity vide')
      }

      setHeader(
        event,
        'Cache-Control',
        'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
      )

      return res.result
    } catch (e) {
      lastError = e

      if (n < 2) {
        await new Promise(resolve => setTimeout(resolve, 300 * (n + 1)))
      }
    }
  }

  console.error('[api/catalogue] Échec de la requête Sanity', lastError)

  throw createError({
    statusCode: 502,
    statusMessage: 'Sanity indisponible',
  })
})