<script setup lang="ts">
const route = useRoute()
const { artworks } =  useCatalogue()

const a = computed(() => artworks.value.find(x => x.id === route.params.id))

const statusLabel: Record<string, string> = {
  available: 'Disponible',
  reserved: 'Réservée',
  private_collection: 'Collection privée',
}

useSeoMeta({
  title: () => a.value?.title || 'Œuvre',
  description: 'Fiche œuvre — Atelier A. Moreau',
})
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
      <p class="mono text-xs">INVENTAIRE / {{ a.id }}</p>
      <h1 class="display my-6 text-5xl">{{ a.title }}</h1>
      <p class="border-t border-black py-4">
        {{ a.year }} · {{ a.technique }} · {{ a.dimensions }}
      </p>
      <p>{{ statusLabel[a.status] || a.status }}</p>
      <NuxtLink
        :to="`/contact?ref=${a.id}`"
        class="mt-8 inline-block border border-black p-4 mono text-xs"
      >
        Demande d’acquisition ↗
      </NuxtLink>
    </aside>
  </main>
  <p v-else class="p-20">Œuvre introuvable</p>
</template>