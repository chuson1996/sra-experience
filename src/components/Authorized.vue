<script setup lang="ts">
import { Magic } from 'magic-sdk';
import { logout } from './UserWrapper';
import queryString from 'query-string';

const props = defineProps<{
  user: {
    referral_code: string
  }
}>()

const href = window.location.href;
const queryObj = queryString.parse(window.location.search);
queryObj.ref = props.user.referral_code;

const referralLink = queryString.stringifyUrl({
  url: href,
  query: queryObj
})

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
        <div class="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">Your referral code is:</div>
        <div class="mx-auto md:max-w-lg md:text-center text-2xl">{{ user.referral_code }}</div>

        <div class="mx-auto md:max-w-lg md:text-center text-2xl">{{ referralLink }}</div>
        <div class="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">Now share with your
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
          <a href="#" @click="logout" class="mt-3 text-sm text-indigo-500">Logout</a>
        </div>
      </div>
      <!-- End Main Hero Content -->

    </div>
  </section>
</template>