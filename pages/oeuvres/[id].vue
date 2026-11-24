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
    { src: images.vue_detail, label: 'Vue de détail' },
  ].filter(slide => typeof slide.src === 'string' && slide.src.trim().length > 0)
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
          class="max-h-[75vh] w-full object-contain"
        >
      </div>

      <div v-if="slides.length > 1" class="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          class="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#969490] px-3 text-xl transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Image précédente"
          :disabled="activeSlide === 0"
          @click="activeSlide--"
        >
          <span aria-hidden="true">←</span>
        </button>

        <p class="text-center text-sm" aria-live="polite" aria-atomic="true">
          {{ slides[activeSlide]?.label }} · {{ activeSlide + 1 }} / {{ slides.length }}
        </p>

        <button
          type="button"
          class="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#969490] px-3 text-xl transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Image suivante"
          :disabled="activeSlide === slides.length - 1"
          @click="activeSlide++"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>

    <aside>
      <button
        type="button"
        class="mb-8 inline-flex items-center text-xs text-[#222222] transition-colors duration-200 hover:text-[#969490] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
        @click="goBack"
      >
        ← Retour
      </button>

      <h1 class="my-6 text-[2rem] leading-tight">{{ a.title }}</h1>

      <p class="border-t-[3px] border-white py-4">
        {{ a.year }} · {{ a.technique }} · {{ a.dimensions }}
      </p>

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