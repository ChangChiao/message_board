export default {
  required(value) {
    return value !== '' && val !== undefined && val !== null;
  },
  userName(value) {
    return /[a-zA-Z0-9]{6,12}$/.test(value);
  },
};
