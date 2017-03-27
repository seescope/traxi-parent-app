import fetch from 'node-fetch';

const API_GATEWAY_URL = 'https://e98k6hknk5.execute-api.ap-southeast-2.amazonaws.com/dev/dashboard?UUIDs=';

export default (uuid) => {
  const url = `${API_GATEWAY_URL}${uuid}`;
  return fetch(url)
    .then(res => res.json());
}
