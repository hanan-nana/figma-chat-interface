export interface GenerateUIResponse {
  html: string;
  imageDataUrl: string;
  modelRawText: string;
  costUsd: number;
  tokens: {
    input: number;
    output: number;
  };
}

export interface APIError {
  message: string;
  status?: number;
}
