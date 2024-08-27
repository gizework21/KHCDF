export const BASE_URL = import.meta.env.VITE_API_ROUTE;

export const getUserInfo = () => {
  const userInfoString = localStorage.getItem("userInfo");
  return userInfoString ? JSON.parse(userInfoString) : null;
};
