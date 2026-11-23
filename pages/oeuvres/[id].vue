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

const statusLabel: Record<string, string> = {
  available: 'Disponible',
  reserved: 'Réservée',
  private_collection: 'Collection privée',
}
</script>

<template>
  <main v-if="a" class="grid gap-10 p-8 md:grid-cols-2 md:p-16">
    <img
      v-if="a.images?.vue_principale"
      :src="a.images.vue_principale"
      :alt="a.title"
      class="max-h-[75vh] w-full object-contain"
    >

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