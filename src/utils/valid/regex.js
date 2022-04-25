export default {
  required (value) {
    return value !== '' && value !== undefined && value !== null;
  },
  userName (value) {
    return /[a-zA-Z0-9]{6,12}$/.test(value);
  },
  password (value) {
    return /[a-zA-Z0-9]{6,12}$/.test(value);
  },
  email (value) {
    return /[a-zA-Z0-9]{6,12}$/.test(value);
  }
};
