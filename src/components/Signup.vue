<script setup lang="ts">
import TallyForm from './TallyForm.vue';
import {cmsContent} from '@/utils/cms';
defineProps<{
  msg: string
}>()
</script>

<template>

  <!-- Section 1 -->
  <section class="w-full py-16 xl:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col items-center md:flex-row">
        <div class="w-full space-y-5 md:w-3/5 md:pr-16">
            <p class="font-medium text-blue-500 uppercase">{{ cmsContent.campaign_floating_label }}</p>
            <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">{{ cmsContent.campaign_title }}</h2>
            <p class="text-xl text-gray-600 md:pr-16">{{ cmsContent.campaign_subtitle }}</p>
        </div>

        <div class="w-full mt-16 md:mt-0 md:w-2/5">
          <div class="relative z-10 h-auto p-8 py-10 overflow-hidden border-b-2 border-gray-300 rounded-lg px-7">
            <TallyForm :form_id="'3q4GRG'" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
