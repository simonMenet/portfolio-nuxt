<script setup lang="ts">
const { data: homepage } = await useFetch<{ heroImage?: string }>(
  '/api/catalogue?type=homepage',
)

useSeoMeta({
  title: 'Simon MENET — Peinture',
  description: 'Peintures et paysages intérieurs.',
})
</script>

<template>
  <main class="flex min-h-[85vh] flex-col border-b border-black">
    <div class="flex flex-1 items-center justify-center p-6">
      <img
        v-if="homepage?.heroImage"
        :src="homepage.heroImage"
        alt="Œuvre de Simon MENET"
        class="max-h-[72vh] max-w-full object-contain"
      >
      <p v-else class="mono text-sm">
        Ajoutez une image principale dans Sanity.
      </p>
    </div>
  </main>
</template>