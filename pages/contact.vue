<script setup lang="ts">
useSeoMeta({ title: 'Contact — Simon MENET', description: 'Écrire à l’atelier.' })

const sent = ref(false)
const route = useRoute()
const router = useRouter()
const artworkId = computed(() => {
  const ref = route.query.ref
  return typeof ref === 'string' ? ref : Array.isArray(ref) ? ref[0] : undefined
})

function goBack() {
  if (typeof window !== 'undefined' && typeof window.history.state?.back === 'string') {
    router.back()
  } else {
    const fallback = artworkId.value
      ? `/oeuvres/${encodeURIComponent(artworkId.value)}`
      : '/oeuvres'
    void navigateTo(fallback)
  }
}
</script>

<template>
  <main class="p-8 md:p-20">
    <button
      type="button"
      class="mono mb-8 inline-flex items-center border-b border-black/30 pb-1 text-xs text-black/60 transition-colors hover:border-black hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
      @click="goBack"
    >
      ← Retour
    </button>
    <h1 class="display display-caps border-b border-black pb-8 text-6xl">Contact</h1>
    <div class="grid gap-12 py-10 md:grid-cols-2">
      <div class="mono text-xs">
        SIMON MENET<br>
        57 impasse des champs du moulin<br>
        73800 COISE<br>
        <a href="mailto:simon.menet.thibault@gmail.com">simon.menet.thibault@gmail.com</a>
      </div>
      <form v-if="!sent" class="space-y-5" @submit.prevent="sent = true">
        <input required placeholder="Nom" class="w-full border-b border-black bg-transparent p-3">
        <input required type="email" placeholder="Courriel" class="w-full border-b border-black bg-transparent p-3">
        <textarea required placeholder="Message" class="w-full border-b border-black bg-transparent p-3"></textarea>
        <button class="border border-black p-4 mono text-xs">Envoyer ↗</button>
      </form>
      <p v-else>Merci — confirmation locale. TODO service Formspree/Resend.</p>
    </div>
  </main>
</template>
