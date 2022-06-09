<script setup lang="ts">
import { campaignID, logout } from './UserWrapper';
import queryString from 'query-string';
import { fetchRewards, fetchUserScore, type Reward } from '@/utils/apis';
import { computed, onMounted, ref } from 'vue';
import IconFacebook from './icons/IconFacebook.vue';
import IconLinkedIn from './icons/IconLinkedIn.vue';
import IconWhatsapp from './icons/IconWhatsapp.vue';
import IconTwitter from './icons/IconTwitter.vue';
import IconEmail from './icons/IconEmail.vue';
import IconRingSpinner from './icons/IconRingSpinner.vue';
import IconWaveFormSpinner from './icons/IconWaveFormSpinner.vue';
import {cmsContent} from '@/utils/cms';


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

const userScoreData = ref<{
  data: number | null
  error: unknown | null
}>({
  data: null,
  error: null
});

const rewardsData = ref<{
  data: Reward[] | null
  error: unknown | null
}>({
  data: null,
  error: null
});

onMounted(() => {
  // fetch user score
  fetchUserScore({
    userID: props.user.referral_code,
    campaignID: campaignID
  })
  .then((score) => {
    userScoreData.value.data = score;
  })
  .catch((error) => {
    userScoreData.value.error = error;
  })

  fetchRewards(campaignID)
  .then((rewards) => {
    rewardsData.value.data = rewards;
  })
  .catch((error) => {
    rewardsData.value.error = error;
  })
});

const input = ref<HTMLInputElement | null>(null);

const loadingUserScore = computed(() => {
  return userScoreData.value.data === null && userScoreData.value.error === null;
});

const loadingRewards = computed(() => {
  return rewardsData.value.data === null && rewardsData.value.error === null;
});

const copied = ref(false);

function copyReferralLink() {
  /* Get the text field */
  var copyText = input.value;

  /* Select the text field */
  copyText?.select();
  copyText?.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText?.value || '');
  copied.value = true;
}

</script>

<template>

  <!-- Section 1 -->
  <section class="w-full pb-12 antialiased bg-white">
    <div class="mx-auto max-w-7xl">
      <!-- Main Hero Content -->
      <div class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
        <h1
          class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
          <span class="inline md:block">You're</span> <span
            class="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">In!</span>
        </h1>

        <div class="prose lg:prose-stone mx-auto my-8">
          <h3>{{ cmsContent.authorized_cta_1 }}</h3>
  
          <p class="lead align-middle flex flex-row gap-4 md:justify-center items-center">
            Your current point:
            <span v-if="loadingUserScore">
              <IconRingSpinner/>
            </span>
            <span v-else class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full font-medium bg-green-500 text-white text-lg">
              {{ userScoreData.data }}
            </span>
          </p>

          <div class="flex flex-col bg-white border shadow-lg rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]" v-auto-animate>
            <div class="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
              <h2 class="my-1 text-gray-500 dark:text-gray-500">
                Rewards
              </h2>
            </div>
            <div class="p-4 md:p-5 border-0 border-b border-gray-200 border-solid grid place-content-center" v-if="loadingRewards">
              <span>
                <IconWaveFormSpinner />
              </span>
            </div>
            <div class="p-4 md:p-5 border-0 border-b border-gray-200 border-solid" v-for="(reward, index) in (rewardsData.data || [])" :key="index">
              <div class="flex flex-row">
                <div class="flex flex-row gap-8">
                  <div class="mr-auto">
                    <span v-if="userScoreData.data && userScoreData.data > reward.required_points">
                      ✅
                    </span>
                    <span v-else>
                      🔒
                    </span>
                  </div>
                  <div class="text-left">
                    <h3 class="my-0 text-lg font-bold text-gray-800 dark:text-white">
                      {{ reward.title }}
                    </h3>
                    <p class="mt-2 text-gray-800 dark:text-gray-400 mb-0" v-if="reward.description">
                      {{ reward.description }}
                    </p>
                  </div>
                </div>

                <div class="ml-auto">
                  <div class="">
                    <div class="flex-1">
                      <span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">
                        {{ reward.required_points }}
                        Points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="mx-auto mt-5 mb-3 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
          <p>{{ cmsContent.authorized_cta_2 }}</p>
        </div>


        <div class="flex flex-row gap-1 justify-center">
          <input
            type="text"
            @change="e => e.preventDefault()"
            disabled
            ref="input"
            :value="referralLink"
            @click="copyReferralLink"
            class=" max-w-lg border-2 border-solid py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 font-[inherit]"/>

          <button @click="copyReferralLink" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 font-[inherit]">
            <span v-auto-animate>
              <span v-if="copied">
                Copied
              </span>
              <span v-else>
                Copy
              </span>
            </span>
          </button>
        </div>

        <div class="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
          <p>{{ cmsContent.share_cta }}</p>
        </div>
        <div class="flex flex-col items-center mt-12 text-center">
          <div class="flex flex-row gap-4">
            <a class="relative inline-flex w-full md:w-auto" :href="'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(referralLink)" target="_blank">
              <IconFacebook class="w-8 fill-blue-500"/>
            </a>
            <a class="relative inline-flex w-full md:w-auto" target="_blank" :href="'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(referralLink) +'&title=LinkedIn%20Developer%20Network&summary=My%20favorite%20developer%20program&source=LinkedIn'">              
              <IconLinkedIn class="w-8 fill-blue-800"/>
            </a>
            <a class="relative inline-flex w-full md:w-auto" :href="'https://wa.me/?text='+ encodeURIComponent(referralLink)" target="_blank">
              <IconWhatsapp class="w-8 fill-green-500"/>
            </a>
            <a class="relative inline-flex w-full md:w-auto" :href="'https://twitter.com/intent/tweet?text=' + encodeURIComponent(referralLink)" target="_blank">
              <IconTwitter class="w-8 fill-blue-400"/>
            </a>
            <a class="relative inline-flex w-full md:w-auto" :href="'mailto:?subject=I wanted you to see this site&amp;body=Check out this site ' + encodeURIComponent(referralLink)" target="_blank">              
              <IconEmail class="w-8 fill-blue-400"/>
            </a>
          </div>

          <a href="#" @click="logout" class="mt-10 text-sm text-gray-500">Logout</a>
        </div>
      </div>
      <!-- End Main Hero Content -->

    </div>
  </section>
</template>