import sendRequest from "./sendRequest";

const BASE_URL = "/api/plans";

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(planData) {
  return sendRequest(BASE_URL, "POST", planData);
}

export async function update(planId, planData) {
  console.log(planData);
  return sendRequest(`${BASE_URL}/${planId}`, "PUT", planData);
}


export async function show(planId) {

  return sendRequest(`${BASE_URL}/${planId}`, "GET");
}

// export async function index(planId) {
//   return sendRequest(`${BASE_URL}/${planId}`, "GET");
// }
