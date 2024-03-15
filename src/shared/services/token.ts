import { TOKEN_DURATION, TOKEN_KEY } from "../constants";

/**
 * Retrieves the token from the local storage and checks if it is still valid.
 * If the token is expired or not found, it returns null.
 * @returns The token string if it is valid, otherwise null.
 */
export const getToken = () => {
  const tokenWithDuration = localStorage.getItem(TOKEN_KEY);

  if (!tokenWithDuration) {
    return null;
  }

  const { token, storedAt, tokenDuration } = JSON.parse(tokenWithDuration);
  const duration = new Date().getTime() - storedAt;
  if (duration > (tokenDuration || TOKEN_DURATION)) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
  return token as string;
};

/**
 * Saves the token to the local storage along with the token's expiration duration.
 * @param token - The token to be saved.
 * @param tokenDuration - The duration (in milliseconds) of the token's validity (optional).
 */
export const saveToken = (token: string, tokenDuration?: string) => {
  const storedAt = new Date().getTime();
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ token, storedAt, tokenDuration })
  );
};

/**
 * Removes the token from the local storage.
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
