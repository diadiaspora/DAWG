// src/services/formBasicService.js
import sendRequest from "./sendRequest"; // Make sure sendRequest.js is in the same directory (src/services)

// Define the base URL for the plan-related API endpoints
// This should match the route you've set up in your backend (e.g., /api/plan)
const BASE_URL = "/api/plan";

/**
 * Fetches all plans from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of plan objects.
 */
export async function index() {
  // sendRequest defaults to GET method if not specified
  return sendRequest(BASE_URL);
}

/**
 * Creates a new plan in the backend.
 * @param {Object} planData - An object containing the data for the new plan (e.g., month, day, year, destination, notes).
 * @returns {Promise<Object>} A promise that resolves to the newly created plan object.
 */
export async function create(planData) {
  // sendRequest will send a POST request with planData as the body
  return sendRequest(BASE_URL, "POST", planData);
}

// You can add more functions here for other CRUD operations if needed
// export async function show(id) {
//   return sendRequest(`${BASE_URL}/${id}`);
// }

// export async function update(id, updatedData) {
//   return sendRequest(`${BASE_URL}/${id}`, "PUT", updatedData);
// }

// export async function deletePlan(id) {
//   return sendRequest(`${BASE_URL}/${id}`, "DELETE");
// }
