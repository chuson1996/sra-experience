const defaultCMS = {
  campaign_title: 'campaign_title',
  campaign_subtitle: 'campaign_subtitle',
  campaign_floating_label: 'campaign_floating_label',
  sign_up_button_text: 'sign_up_button_text',
  authorized_cta_1: 'authorized_cta_1',
  authorized_cta_2: 'authorized_cta_2',
  share_cta: 'share_cta',
}

const cmsContentStr = document.querySelector('#sra-experience')?.attributes.getNamedItem('data-cms-config')?.value || '{}';
export let cmsContent = defaultCMS;

try {
  console.log(cmsContentStr.replace(/\'/g, `"`))
  const foundCmsContent = JSON.parse(cmsContentStr.replace(/\'/g, `"`));
  cmsContent = {
    ...defaultCMS,
    ...foundCmsContent
  }
} catch (error) {
  console.error(error);
  cmsContent = defaultCMS;
}
