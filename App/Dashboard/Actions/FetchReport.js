const API_GATEWAY_URL = 'https://e98k6hknk5.execute-api.ap-southeast-2.amazonaws.com/dev/dashboard?UUIDs=';

export default UUID => dispatch => {
  const url = `${API_GATEWAY_URL}${UUID}`;
  dispatch({ type: 'FETCHING_REPORT' });

  return fetch(url)
    .then(res => res.json())
    .then(report => {
      dispatch({
        type: 'FETCHED_REPORT',
        report,
        UUID
      });
    });
}
