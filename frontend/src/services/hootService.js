import sendRequest from "./sendRequest";

const BASE_URL = "/api/hoots";

export async function create(hootData) {
  return sendRequest(BASE_URL, "POST", hootData);
}

export async function index() {
  return sendRequest(BASE_URL);
}

export async function show(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`);
}

export async function comment(hootId, commentData) {
  return sendRequest(`${BASE_URL}/${hootId}/comments`, "POST", commentData);
}

export async function likeHoot(hootId) {
  return sendRequest(`/api/hoots/${hootId}/like`, "PUT");
}

export async function unlikeHoot(hootId) {
  return sendRequest(`/api/hoots/${hootId}/unlike`, "PUT");
}

export async function likeComment(hootId, commentId) {
  return sendRequest(`/api/hoots/${hootId}/comments/${commentId}/like`, "PUT");
}

export async function unlikeComment(hootId, commentId) {
  return sendRequest(
    `/api/hoots/${hootId}/comments/${commentId}/unlike`,
    "PUT"
  );
}

export async function getPaginated(page = 1, limit = 10) {
  return sendRequest(`${BASE_URL}/paginated?page=${page}&limit=${limit}`);
}
