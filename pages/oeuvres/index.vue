<script setup lang="ts">
const { artworks, series } = useCatalogue()

useSeoMeta({
  title: 'Œuvres — Simon MENET',
  description: 'Série Les Eaux intérieures et œuvres choisies.',
})
</script>

<template>
  <main class="p-8 md:p-16">
    <section v-for="s in series" :key="s.id" class="mb-20 pt-5">
      <h2 class="text-4xl">{{ s.title }}</h2>
      <p class="my-6 max-w-2xl">{{ s.statement }}</p>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="a in artworks.filter(x => x.seriesId === s.id)"
          :key="a.id"
          :to="`/oeuvres/${a.id}`"
        >
          <img :src="a.images?.vue_principale" :alt="a.title" class="w-full object-contain">
          <p class="mono mt-2 text-xs">{{ a.title }} — {{ a.year }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="pt-5">
      <h2 class="text-4xl">Œuvres choisies</h2>
      <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="a in artworks.filter(x => !x.seriesId)"
          :key="a.id"
          :to="`/oeuvres/${a.id}`"
        >
          <img :src="a.images?.vue_principale" :alt="a.title" class="w-full object-contain">
          <p class="mono mt-2 text-xs">{{ a.title }}</p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>