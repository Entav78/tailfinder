export type ErrorResponse = {
  errors: {
    message: string;
    path?: string;
  }[];
};
