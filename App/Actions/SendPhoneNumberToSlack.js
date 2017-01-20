export default (phoneNumber) => () => {
  return fetch(phoneNumber);
};
