import sendRequest from "./sendRequest";

const BASE_URL = "/api/plans";

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(planData) {
  return sendRequest(BASE_URL, "POST", planData);
}