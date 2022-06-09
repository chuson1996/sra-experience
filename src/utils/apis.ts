const SERVER_URL = 'http://localhost:4621';

export type Reward = {
  id: string
  title: string
  description: string
  required_points: number
}

export const fetchRewards = async (campaignID: string | number): Promise<Reward[]> => {
  return fetch(`${SERVER_URL}/campaign/${campaignID}/rewards`, {
    method: 'GET'
  }).then(response => response.json())
  .then(rewards => rewards.sort((a: Reward, b: Reward) => a.required_points - b.required_points));
}

export const fetchUserScore = async (props: { userID: string | number, campaignID: string | number }): Promise<number> => {
  return fetch(`${SERVER_URL}/users/${props.userID}/campaigns/${props.campaignID}/score`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => data?.score);
}
