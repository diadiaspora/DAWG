import sendRequest from "./sendRequest";

const BASE_URL = "/api/gallery";

// Upload a single image to a profile's gallery
export async function uploadImage(profileId, formData) {
  return sendRequest(`${BASE_URL}/upload/${profileId}`, "POST", formData, true);
}

// Delete a specific image from a profile's gallery
export async function deleteImage(profileId, imageUrl) {
  return sendRequest(`${BASE_URL}/delete/${profileId}`, "DELETE", { imageUrl });
}

// Get all images for a profile's gallery
export async function getGallery(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`);
}
