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

export async function update(blogId, blogData) {
  
  return sendRequest(`${BASE_URL}/${blogId}`, "PUT", blogData);
}

export async function deleteBlog(blogId) {
  return sendRequest(`${BASE_URL}/${blogId}`, "DELETE");
}

export function getUserBlogs() {
  return sendRequest(`${BASE_URL}/profile/blogs`);
}