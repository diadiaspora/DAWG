import sendRequest from "./sendRequest";

const BASE_URL = "/api/auth";

export async function signUp(userData) {
  const data = await sendRequest(BASE_URL + "/signup", "POST", userData);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return getUser();
}

export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, "POST", credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Basic sanity check: JWTs have 3 parts separated by '.'
  if (token.split(".").length !== 3) {
    // Token is invalid format — remove it and return null
    localStorage.removeItem("token");
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return token;
  } catch (err) {
    // Decoding failed - remove invalid token and return null
    localStorage.removeItem("token");
    return null;
  }
}

export function logOut() {
  localStorage.removeItem("token");
}

