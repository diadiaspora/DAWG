import sendRequest from "./sendRequest";

const BASE_URL = "/api/posts";

// GET all posts
export async function index() {
  return sendRequest(BASE_URL);
}


export async function show(postId) {
  return sendRequest(`${BASE_URL}/${postId}`);
}


export async function create(postData) {
  return sendRequest(BASE_URL, "POST", postData);
}

export async function update(postId, postData) {
  return sendRequest(`${BASE_URL}/${postId}`, "PUT", postData);
}

// You can also plan for a future "like" method:
export async function like(postId) {
  return sendRequest(`${BASE_URL}/${postId}/like`, "POST");
}
