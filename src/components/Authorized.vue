<script setup lang="ts">
let showMenu = false;
</script>

<template>

  <!-- Section 1 -->
  <section class="w-full px-6 pb-12 antialiased bg-white">
    <div class="mx-auto max-w-7xl">
      <!-- Main Hero Content -->
      <div class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
        <h1
          class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
          <span class="inline md:block">You're</span> <span
            class="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">In!</span>
        </h1>
        <div class="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">Now share to your
          friends, mom and dad</div>
        <div class="flex flex-col items-center mt-12 text-center">
          <span class="relative inline-flex w-full md:w-auto">
            <a href="#_"
              class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Share
              via Twitter</a>
            <span
              class="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-green-400 rounded-full">only
              $15/mo</span>
          </span>
          <a href="#" class="mt-3 text-sm text-indigo-500">Learn More</a>
        </div>
      </div>
      <!-- End Main Hero Content -->

    </div>
  </section>

  <!-- Section 2 -->
  <section class="bg-white pt-7 pb-14">
    <div class="container px-8 mx-auto sm:px-12 lg:px-20">
      <h1 class="text-sm font-bold tracking-wide text-center text-gray-800 uppercase mb-7">Trusted by top-leading
        companies.</h1>
      <div class="grid items-center justify-center grid-cols-12 gap-y-8">
        <div class="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
          <img src="https://cdn.devdojo.com/tails/images/disney-plus.svg" alt="Disney Plus"
            class="block object-contain h-12">
        </div>
        <div class="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
          <img src="https://cdn.devdojo.com/tails/images/google.svg" alt="Google" class="block object-contain h-9">
        </div>
        <div class="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
          <img src="https://cdn.devdojo.com/tails/images/hubspot.svg" alt="Hubspot" class="block object-contain h-9">
        </div>
        <div class="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
          <img src="https://cdn.devdojo.com/tails/images/youtube.svg" alt="Youtube"
            class="block object-contain h-7 lg:h-8">
        </div>
        <div class="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-6 xl:col-span-2">
          <img src="https://cdn.devdojo.com/tails/images/slack.svg" alt="Slack" class="block object-contain h-9">
        </div>
        <div class="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-6 xl:col-span-2">
          <img src="https://cdn.devdojo.com/tails/images/shopify.svg" alt="Shopify" class="block object-contain h-9">
        </div>
      </div>
    </div>
  </section>

</template>