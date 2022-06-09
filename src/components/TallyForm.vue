<template>
  <button :disabled="loginDisabled" class="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg disabled:cursor-not-allowed disabled:opacity-20 hover:bg-blue-700 shadow-lg shadow-blue-500/50 border-0" @click="openForm">{{ cmsContent.sign_up_button_text }}</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import queryString from 'query-string';
import { campaignID, login } from './UserWrapper';
import {cmsContent} from '@/utils/cms';

const Tally = (window as any).Tally;

const props = defineProps<{
  form_id: string
}>();

let loginDisabled = ref(false);

onMounted(function() {
  loginDisabled.value = !campaignID;
});

function openForm() {
  const formId = props.form_id;
  const query = queryString.parse(window.location.search);

  const options: PopupOptions = {
    layout: 'modal',
    emoji: {
      text: '👋',
      animation: 'wave'
    },
    hiddenFields: {
      ref: query?.ref
    },
    autoClose: 0,
    onSubmit: (payload: any) => {
      console.log({payload});
      const emailField = payload.fields.find((field: any) => field.type === 'INPUT_EMAIL')
      const email = emailField.answer.raw;

      login({ email })
    }
  }

  Tally.openPopup(formId, options);
}


// Available options
type PopupOptions = {
  layout?: 'default' | 'modal';
  width?: number;
  alignLeft?: boolean;
  hideTitle?: boolean;
  overlay?: boolean;
  emoji?: {
    text: string;
    animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'flash' | 'bounce' | 'rubber-band' | 'head-shake';
  };
  autoClose?: number;
  customFormUrl?: string;
  hiddenFields?: {
    [key: string]: any,
  };
  onOpen?: () => void;
  onClose?: () => void;
  onPageView?: (page: number) => void;
  onSubmit?: (payload: any) => void;
};

</script>
