<template>
  <div class="min-h-screen bg-[#F7F7F6] text-[#222222]">
    <header class="sticky top-0 bg-[#F7F7F6] p-4">
      <NuxtLink to="/" class="display">Simon MENET</NuxtLink>

      <nav class="float-right flex gap-5 mono text-base">
        <NuxtLink to="/oeuvres">ŒUVRES</NuxtLink>
        <NuxtLink to="/demarche">DEMARCHE</NuxtLink>
        <NuxtLink to="/contact">CONTACT</NuxtLink>
      </nav>
    </header>

    <NuxtPage />

    <footer class="p-6 mono text-xs">
      © Simon MENET — COISE
    </footer>
  </div>
</template>