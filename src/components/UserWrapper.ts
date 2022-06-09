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
  status: 'idle' | 'fetching_ml_user' | 'fetching_campaign' | 'done'
}>({
  user: null,
  userError: null,
  status: 'idle'
})

const m = new Magic('pk_live_153CD26CD773F001');

export async function checkSignup() {
  try {
    userRef.status = 'fetching_ml_user';
    if (await m.user.isLoggedIn()) {
      const idToken = await m.user.getIdToken();
  
      userRef.status = 'fetching_campaign';
      const [data] = await Promise.all([
        fetch(`https://sra-admin.herokuapp.com/?campaign=${campaignID}`, {
          method: 'POST',
          body: JSON.stringify({
            token_id: idToken,
            campaign_id: campaignID
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(response => response.json()),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
      
      userRef.user = data
      userRef.status = 'done';
      return userRef.user;
    }
    userRef.status = 'done';
    return null;
  } catch (error: any) {
    userRef.userError = error;
    userRef.status = 'done';
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