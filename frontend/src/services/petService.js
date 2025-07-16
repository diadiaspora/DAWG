import sendRequest from "./sendRequest";

const BASE_URL = "/api/pets";

export async function create(petData) {
  return sendRequest(BASE_URL, "POST", petData, true); 
}


export async function index() {
  return sendRequest(BASE_URL);
}

export async function show(petId) {
  return sendRequest(`${BASE_URL}/${petId}`);
}

export async function update(petId, petData) {
  return sendRequest(`${BASE_URL}/${petId}`, "PUT", petData);
}

export async function deletePet(petId) {
  return sendRequest(`${BASE_URL}/${petId}`, "DELETE");
}

