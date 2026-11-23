<script setup lang="ts">
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#F7F7F6] text-[#222222]">
    <header class="sticky top-0 z-50 bg-[#F7F7F6] px-5 py-6 md:px-8 md:py-7">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="display text-xl md:text-2xl"
          @click="closeMenu"
        >
          Simon MENET
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-base md:flex">
          <NuxtLink to="/oeuvres">ŒUVRES</NuxtLink>
          <NuxtLink to="/demarche">DEMARCHE</NuxtLink>
          <NuxtLink to="/contact">CONTACT</NuxtLink>
        </nav>

        <button
          type="button"
          class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="menuOpen = !menuOpen"
        >
          <span
            class="h-px w-6 bg-[#222222] transition-transform"
            :class="menuOpen ? 'translate-y-2 rotate-45' : ''"
          />
          <span
            class="h-px w-6 bg-[#222222] transition-opacity"
            :class="menuOpen ? 'opacity-0' : ''"
          />
          <span
            class="h-px w-6 bg-[#222222] transition-transform"
            :class="menuOpen ? '-translate-y-2 -rotate-45' : ''"
          />
        </button>
      </div>

      <nav
        v-if="menuOpen"
        id="mobile-menu"
        class="flex flex-col gap-5 pt-6 text-base md:hidden"
      >
        <NuxtLink to="/oeuvres" @click="closeMenu">ŒUVRES</NuxtLink>
        <NuxtLink to="/demarche" @click="closeMenu">DEMARCHE</NuxtLink>
        <NuxtLink to="/contact" @click="closeMenu">CONTACT</NuxtLink>
      </nav>
    </header>

    <NuxtPage />

    <footer class="p-6 text-xs">
      © Simon MENET — COISE
    </footer>
  </div>
</template>