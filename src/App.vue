<script setup lang="ts">
import Signup from './components/Signup.vue'
import Authorized from './components/Authorized.vue'
import { reactive } from 'vue'
import LoadingPlaceholder from './components/LoadingPlaceholder.vue'
import { checkSignup, userRef } from './components/UserWrapper';
import IconRaceByLoader from './components/icons/IconRaceByLoader.vue';
// import TheWelcome from './components/TheWelcome.vue'

const state = reactive<{
  auth: {
    loading: boolean
    user: any
    error: any
  }
}>({
  auth: {
    loading: true,
    user: null,
    error: null
  }
});

(async () => {
  state.auth.loading = true;
  checkSignup()
    .then((user) => {
      state.auth.loading = false;
    })
})()
</script>

<template>
  <div class="tw" v-auto-animate>
    <div class="mx-auto my-4 grid place-content-center italic" v-if="userRef.status === 'fetching_ml_user'">
      Preparing a birthday cake for you...
    </div>
    <div class="mx-auto my-4 grid place-content-center italic" v-if="userRef.status === 'fetching_campaign'">
      Never mind, it's not your birthday yet. Fetching campaign now...
    </div>
    <div v-if="state.auth.loading === true">
      <div class="mx-auto my-4 grid place-content-center">
        <IconRaceByLoader class="w-40"/>
      </div>
    </div>
    <div v-else>
      <div v-if="!userRef.user">
        <Signup msg="No I did it!" />
      </div>
      <div v-else-if="userRef.user">
        <Authorized :user="userRef.user"/>
      </div>
    </div>
  </div>
</template>

<style>
@import './assets/base.css';
@import './assets/output.css';
</style>
