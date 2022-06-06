import { reactive } from "vue";
import { Magic } from 'magic-sdk';
import queryString from 'query-string';

export const campaignID = parseInt(document.querySelector('#sra-experience')
  ?.attributes.getNamedItem('data-campaign-id')?.value || '0');

export const userRef = reactive<{
  user: {
    verified: boolean;
    referral_code: string;
  } | null
  userError: any
}>({
  user: null,
  userError: null
})

const m = new Magic('pk_live_153CD26CD773F001');

export async function checkSignup() {
  try {
    if (await m.user.isLoggedIn()) {
      const idToken = await m.user.getIdToken();
      const query = queryString.parse(window.location.search);
  
      const data = await fetch(`https://sra-admin.herokuapp.com/?campaign=${campaignID}`, {
        method: 'POST',
        body: JSON.stringify({
          token_id: idToken,
          campaign_id: campaignID
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json());

      userRef.user = data

      return userRef.user;
    }
    return null;
  } catch (error: any) {
    userRef.userError = error;
    throw error;
  }
}

export function logout() {
  m.user.logout();
  userRef.user = null;
}

export async function login({ email }: { email: string }) {
  const query = queryString.parse(window.location.search);
  const tokenID = await m.auth.loginWithMagicLink({
    email,
    showUI: true, // Default "true", setting "false" will hide loading screen
  });
  const res = await fetch(`https://sra-admin.herokuapp.com/`, {
    method: 'POST',
    body: JSON.stringify({
      campaign_id: campaignID,
      token_id: tokenID,
      used_code: query?.ref
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const userData = await res.json();
  userRef.user = userData;
  return userRef.user;
}