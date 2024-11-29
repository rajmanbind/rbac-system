// storing the token
const storeToken = async (value) => {
  localStorage.setItem("user", JSON.stringify(value));
};

// getting the token
const getToken = async () => {
  let token = localStorage.getItem("user");
  return JSON.parse(token);
};
// removing the token
const removeToken = async (value) => {
  localStorage.removeItem(value);
};

export { storeToken, getToken, removeToken };
