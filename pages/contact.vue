<script setup lang="ts">
useSeoMeta({
  title: 'Contact — Simon MENET',
  description: 'Écrire à l’atelier.',
})

const sent = ref(false)
</script>

<template>
  <main class="p-8 md:p-20">
    <h1 class="display border-b-2 border-white pb-8 text-[2.25rem]">
      Contact
    </h1>

    <div class="grid gap-12 py-10 md:grid-cols-2">
      <div class="text-xs">
        SIMON MENET<br>
        57 impasse des champs du moulin<br>
        73800 COISE<br>
        <a href="mailto:simon.menet.thibault@gmail.com">
          simon.menet.thibault@gmail.com
        </a>
      </div>

      <form v-if="!sent" class="space-y-5" @submit.prevent="sent = true">
        <input
          required
          placeholder="Nom"
          class="w-full border-b-2 border-white bg-transparent p-3"
        >
        <input
          required
          type="email"
          placeholder="Courriel"
          class="w-full border-b-2 border-white bg-transparent p-3"
        >
        <textarea
          required
          placeholder="Message"
          class="w-full border-b-2 border-white bg-transparent p-3"
        />
        <button
          type="submit"
          class="border-2 border-white p-4 text-xs transition-colors duration-200 hover:border-[#222222]"
        >
          Envoyer ↗
        </button>
      </form>

      <p v-else>Merci — confirmation locale. TODO service Formspree/Resend.</p>
    </div>
  </main>
</template>