/**
 * Represents a successful login response from the API.
 *
 * Example:
 * ```json
 * {
 *   "data": {
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "accessToken": "eyJhbGciOiJIUzI1NiIsInR..."
 *   }
 * }
 * ```
 *
 * @property data - Contains the authenticated user's basic info and access token.
 * @property data.name - The user's display name.
 * @property data.email - The user's email address.
 * @property data.accessToken - The JWT or token used for authenticated requests.
 */
export type LoginResponse = {
  data: {
    name: string;
    email: string;
    accessToken: string;
  };
};
