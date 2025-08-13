import sendRequest from "./sendRequest";

const BASE_URL = "/api/auth";

// --- SIGN UP ---

export async function signUp(userData) {


  return await sendRequest(BASE_URL + "/signup", "POST", userData);
}

// --- LOGIN ---

export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, "POST", credentials);
  localStorage.setItem("token", token);
  return getUser();
}

// --- LOGOUT ---
export function logOut() {
  localStorage.removeItem("token");
}

// --- GET USER ---
export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

// --- GET TOKEN ---
export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // JWT format validation
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
