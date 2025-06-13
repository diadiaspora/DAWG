import sendRequest from "./sendRequest";

const BASE_URL = "/api/blogs";

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(blogData) {
  return sendRequest(BASE_URL, "POST", blogData);
}


export async function show(blogId) {
  return sendRequest(`${BASE_URL}/${blogId}`);
}