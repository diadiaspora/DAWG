import sendRequest from "./sendRequest";

const BASE_URL = "/api/auth";

export async function signUp(userData) {
  await sendRequest(BASE_URL + "/signup", "POST", userData);
  return null; // don’t try to get a token yet
}

export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, "POST", credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Quick validation: JWTs are in 3 parts separated by dots
  if (token.split(".").length !== 3) {
    localStorage.removeItem("token");
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
  } catch (e) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}
