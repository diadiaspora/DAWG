import sendRequest from "./sendRequest";

const BASE_URL = "/api/profiles";

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(profileData) {
  return sendRequest(BASE_URL, "POST", profileData);
}

export async function update(profileId, profileData) {
  return sendRequest(`${BASE_URL}/${profileId}`, "PUT", profileData);
}

export async function show(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`, "GET");
}

export function getUserBlogs() {
  return sendRequest(`${BASE_URL}/profile/blogs`);
}
