<script setup lang="ts">
const { artworks } =  useCatalogue()

const i = ref(0)
const total = computed(() => artworks.value.length)
const a = computed(() => artworks.value[i.value])

useSeoMeta({
  title: 'Simon MENET — Peinture',
  description: 'Peintures et paysages intérieurs.',
})

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (total.value > 1) {
    timer = setInterval(() => {
      i.value = (i.value + 1) % total.value
    }, 7000)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function prev() {
  i.value = (i.value - 1 + total.value) % total.value
}
function next() {
  i.value = (i.value + 1) % total.value
}
</script>

<template>
  <main class="flex min-h-[85vh] flex-col border-b border-black">
    <div class="flex flex-1 items-center justify-center p-6">
      <NuxtLink v-if="a" :to="`/oeuvres/${a.id}`">
        <img
          v-if="a.images?.vue_principale"
          :src="a.images.vue_principale"
          :alt="a.title"
          class="max-h-[72vh] max-w-full object-contain"
        >
      </NuxtLink>
    </div>
    <div class="flex justify-between border-t border-black p-5 mono text-xs">
      <span>{{ a?.title }} — {{ a?.year }}</span>
      <span v-if="total > 0">
        <button @click="prev">←</button>
        {{ i + 1 }} / {{ total }}
        <button @click="next">→</button>
      </span>
    </div>
  </main>
</template>