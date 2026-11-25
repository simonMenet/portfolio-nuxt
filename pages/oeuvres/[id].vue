<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { artworks } = useCatalogue()

function goBack() {
  if (typeof window !== 'undefined' && typeof window.history.state?.back === 'string') {
    router.back()
  } else {
    void navigateTo('/oeuvres')
  }
}

const a = computed(() => artworks.value.find(x => x.id === route.params.id))
const activeSlide = ref(0)
const slides = computed(() => {
  const images = a.value?.images
  if (!images) return []

  return [
    { src: images.vue_principale, label: 'Vue principale' },
    { src: images.vue_situation, label: 'Vue en situation' },
    { src: images.vue_detail, label: 'Vue de détail 1' },
    { src: images.vue_detail_2, label: 'Vue de détail 2' },
    { src: images.vue_detail_3, label: 'Vue de détail 3' },
  ].filter((slide): slide is { src: string; label: string } =>
    typeof slide.src === 'string' && slide.src.trim().length > 0,
  )
})

watch(() => a.value?.id, () => { activeSlide.value = 0 })
watch(() => slides.value.length, length => {
  if (activeSlide.value >= length) activeSlide.value = 0
})

const statusLabel: Record<string, string> = {
  available: 'Disponible',
  reserved: 'Réservée',
  private_collection: 'Collection privée',
}
const formattedPrice = computed(() => {
  const price = a.value?.price
  return price !== undefined && price !== null
    ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
    : null
})
</script>

<template>
  <main v-if="a" class="grid gap-10 p-8 md:grid-cols-2 md:p-16">
    <section
      v-if="slides.length"
      class="min-w-0"
      role="region"
      aria-roledescription="carrousel"
      :aria-label="`Images de ${a.title}`"
    >
      <div
        class="flex min-h-[18rem] items-center justify-center"
        role="group"
        aria-roledescription="diapositive"
        :aria-label="`Image ${activeSlide + 1} sur ${slides.length} : ${slides[activeSlide]?.label}`"
      >
        <img
          :src="slides[activeSlide]?.src"
          :alt="`${a.title} — ${slides[activeSlide]?.label}`"
          class="max-h-[calc(100dvh-5rem)] w-full object-contain"
        >
      </div>

      <div v-if="slides.length > 1" class="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          v-for="(slide, index) in slides"
          :key="`${slide.label}-${index}`"
          type="button"
          class="overflow-hidden"
          :aria-label="`Afficher ${slide.label}`"
          :aria-pressed="activeSlide === index"
          :style="{
            border: activeSlide === index ? '2px solid #222222' : '2px solid transparent',
          }"
          @click="activeSlide = index"
        >
          <img :src="slide.src" :alt="''" class="h-16 w-16 object-cover">
        </button>
      </div>
    </section>

    <aside>
      <button
        type="button"
        class="mb-8 inline-flex items-center gap-2 text-xs text-[#222222] transition-colors duration-200 hover:text-[#969490] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
        @click="goBack"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M10.5 3.5 6 8l4.5 4.5M6.25 8h7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="inline-flex items-center leading-none">Retour</span>
      </button>

      <h1 class="my-6 text-[2rem] leading-tight">{{ a.title }}</h1>

      <p class="border-t-[3px] border-white py-4">
        {{ a.year }} · {{ a.technique }} · {{ a.dimensions }}
      </p>

      <p v-if="formattedPrice" class="mb-3">{{ formattedPrice }}</p>
      <p>{{ statusLabel[a.status] || a.status }}</p>

      <NuxtLink
        :to="`/contact?ref=${a.id}`"
        class="mt-8 inline-block border-[3px] border-white p-4 text-xs transition-colors duration-200 hover:border-[#222222]"
      >
        Demande d’acquisition ↗
      </NuxtLink>
    </aside>
  </main>

  <p v-else class="p-20">Œuvre introuvable</p>
</template>