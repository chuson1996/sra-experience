<script setup lang="ts">
import TallyForm from './TallyForm.vue';
defineProps<{
  msg: string
}>()
</script>

<template>

  <!-- Section 1 -->
  <section class="w-full px-8 py-16 bg-gray-100 xl:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col items-center md:flex-row">
        <div class="w-full space-y-5 md:w-3/5 md:pr-16">
            <p class="font-medium text-blue-500 uppercase">This deal will soon be gone</p>
            <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">Get early access to Rens Metaverse</h2>
            <p class="text-xl text-gray-600 md:pr-16">Where influencers can create digital fashionable merchs to the audience</p>
        </div>

        <div class="w-full mt-16 md:mt-0 md:w-2/5">
          <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
            <TallyForm :form_id="'3q4GRG'" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
