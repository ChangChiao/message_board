export default {
  required (value) {
    return value !== '' && value !== undefined && value !== null;
  },
  name (value) {
    return value?.length >= 2;
  },
  password (value) {
    return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,20}$/.test(value);
  },
  email (value) {
    // eslint-disable-next-line no-useless-escape
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }
};
