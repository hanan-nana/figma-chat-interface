import { API_CONFIG } from "./config";
import { GenerateUIResponse, APIError } from "./types";

export const generateUI = async (
  instruction: string,
  image?: File
): Promise<GenerateUIResponse> => {
  try {
    const formData = new FormData();
    formData.append("instruction", instruction);

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data: GenerateUIResponse = await response.json();
    return data;
  } catch (error) {
    const apiError: APIError = {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      status: error instanceof Response ? error.status : undefined,
    };
    throw apiError;
  }
};
