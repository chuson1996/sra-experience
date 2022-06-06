<template>
  <div ref="tallyForm">Hello</div>
  <button @click="openForm">Click</button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Magic } from 'magic-sdk';
import queryString from 'query-string';


const m = new Magic('pk_live_153CD26CD773F001'); // ✨

const Tally = (window as any).Tally;

const props = defineProps<{
  form_id: string
}>();

onMounted(function() {

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
    onSubmit: (payload: any) => {
      console.log({payload});
      const emailField = payload.fields.find((field: any) => field.type === 'INPUT_EMAIL')
      const email = emailField.answer.raw;
      m.auth.loginWithMagicLink({ email })
        .then((tokenID) => {
          fetch(`http://localhost:4621`, {
            method: 'POST',
            body: JSON.stringify({
              campaign_id: parseInt(query?.campaign_id as string),
              token_id: tokenID,
              used_code: query?.ref
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(console.log)
        })
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


// Example: open a popup with default options
// Tally.openPopup(formId);

// Example: opening a popup as a centered modal
// Tally.openPopup(formId, {
//   layout: 'modal', // Open as a centered modal
//   width: 700, // Set the width of the modal
//   autoClose: 5000, // Close the popup 5 seconds after form was submitted (in ms)
// });

// Example: set custom hidden fields
// Tally.openPopup(formId, {
//   hiddenFields: {
//     ref: 'downloads',
//     email: 'alice@example.com'
//   }
// });

// Example: customization via custom domain URL + code injection
// Tally.openPopup(formId, {
//   customFormUrl: 'https://yourdomain.com/form',
// });

// Example: use callback functions to handle events
// Tally.openPopup(formId, {
//   onOpen: () => {
//     // The popup was opened, mark the form as seen
//     // ...
//   },
//   onClose: () => {
//     // The popup was closed
//     // ...
//   },
//   onPageView: (page: number) => {
//     // Log the page view
//     // ...
//   },
//   onSubmit: (payload: any) => {
//     console.log({ payload });
//     // Form was submitted, use the answers payload in your application
//     // ...
//   }
// });

</script>
