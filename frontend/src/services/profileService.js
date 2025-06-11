import sendRequest from "./sendRequest";

const BASE_URL = "/api/profies";

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(profileData) {
  return sendRequest(BASE_URL, "POST", profileData);
}

export async function update(profileData) {
  console.log(profileData);
  return sendRequest(`${BASE_URL}/${profileData.id}`, "PUT", profileData);
}