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
  ]
    .filter(slide => typeof slide.src === 'string' && slide.src.trim().length > 0)
    .slice(0, 3)
})

watch(() => a.value?.id, () => {
  activeSlide.value = 0
})

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
  <main
    v-if="a"
    class="artwork-detail grid gap-6 overflow-hidden p-6 md:grid-cols-2 md:gap-10 md:px-16 md:py-8"
  >
    <section
      v-if="slides.length"
      class="flex min-h-0 min-w-0 flex-col justify-center"
      role="region"
      aria-roledescription="carrousel"
      :aria-label="`Images de ${a.title}`"
    >
      <div class="mx-auto flex min-h-0 w-full max-w-3xl flex-col justify-center">
        <div
          class="flex min-h-0 w-full flex-1 items-center justify-center"
          role="group"
          aria-roledescription="diapositive"
          :aria-label="`Image ${activeSlide + 1} sur ${slides.length} : ${slides[activeSlide]?.label}`"
        >
          <Transition name="image-fade" mode="out-in">
            <img
              :key="slides[activeSlide]?.label"
              :src="slides[activeSlide]?.src"
              :alt="`${a.title} — ${slides[activeSlide]?.label}`"
              class="max-h-full max-w-full object-contain"
            >
          </Transition>
        </div>

        <div v-if="slides.length > 1" class="shrink-0 pt-4">
          <div class="flex flex-wrap items-center justify-center gap-3" role="group" aria-label="Choisir une image">
            <button
              v-for="(slide, index) in slides"
              :key="slide.label"
              type="button"
              class="h-20 w-20 shrink-0 overflow-hidden border-2 p-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              :style="{
                borderColor: activeSlide === index ? '#222222' : 'transparent',
              }"
              :aria-label="`Afficher ${slide.label}`"
              :aria-pressed="activeSlide === index"
              @click="activeSlide = index"
            >
              <img :src="slide.src" alt="" class="h-full w-full object-cover">
            </button>
          </div>

          <p class="mt-2 text-center text-sm" aria-live="polite" aria-atomic="true">
            {{ slides[activeSlide]?.label }} · {{ activeSlide + 1 }} / {{ slides.length }}
          </p>
        </div>
      </div>
    </section>

    <aside class="flex min-h-0 flex-col justify-center">
      <button
        type="button"
        class="mb-5 inline-flex w-fit items-center text-xs text-[#222222] transition-colors duration-200 hover:text-[#969490] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
        @click="goBack"
      >
        ← Retour
      </button>

      <h1 class="my-4 text-[2rem] leading-tight">{{ a.title }}</h1>

      <p class="border-t-[3px] border-white py-4">
        {{ a.year }} · {{ a.technique }} · {{ a.dimensions }}
      </p>

      <p>{{ statusLabel[a.status] || a.status }}</p>

      <NuxtLink
        :to="`/contact?ref=${a.id}`"
        class="mt-6 inline-block w-fit border-[3px] border-white p-4 text-xs transition-colors duration-200 hover:border-[#222222]"
      >
        Demande d’acquisition ↗
      </NuxtLink>
    </aside>
  </main>

  <p v-else class="p-20">Œuvre introuvable</p>
</template>

<style scoped>
.artwork-detail {
  height: calc(100vh - 5rem);
  height: calc(100dvh - 5rem);
}

.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 120ms ease;
}

.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
}
</style>