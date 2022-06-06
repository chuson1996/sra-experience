<script setup lang="ts">
import Signup from './components/Signup.vue'
import Authorized from './components/Authorized.vue'
import { reactive } from 'vue'
import LoadingPlaceholder from './components/LoadingPlaceholder.vue'
import { checkSignup, userRef } from './components/UserWrapper';
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
  <div class="tw">
    <div v-if="state.auth.loading === true">
      <LoadingPlaceholder/>
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
