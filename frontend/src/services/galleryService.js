import sendRequest from "./sendRequest";

const BASE_URL = "/api/gallery";

export async function uploadImage(profileId, formData) {
  return sendRequest(`${BASE_URL}/upload/${profileId}`, "POST", formData, true);
}

export async function deleteImage(profileId, imageUrl) {
  return sendRequest(`${BASE_URL}/delete/${profileId}`, "DELETE", { imageUrl });
}

export async function getGallery(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`);
}
