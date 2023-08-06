export interface ResponseError {
  getErrorResponse: () => [number, { [key: string]: any }];
}

export function isResponseError(obj: any): obj is ResponseError {
  return (
    typeof obj === "object" &&
    "getErrorResponse" in obj &&
    typeof obj.getErrorResponse === "function"
  );
}
