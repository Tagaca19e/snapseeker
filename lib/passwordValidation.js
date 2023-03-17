// check password validation
const passwordValidation = (password) => {
  const pattern =
    /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;

  const res = pattern.test(password);
  return res;
};
export default passwordValidation;