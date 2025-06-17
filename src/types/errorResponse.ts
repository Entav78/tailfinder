/**
 * Represents a standard API error response.
 *
 * Example:
 * ```json
 * {
 *   "errors": [
 *     {
 *       "message": "Email is already taken",
 *       "path": "email"
 *     }
 *   ]
 * }
 * ```
 *
 * @property errors - An array of error objects, each with a required message and optional path
 */
export type ErrorResponse = {
  errors: {
    message: string;
    path?: string;
  }[];
};
