import bcrypt from 'bcryptjs';

/**
 * Hashes a plain text password.
 * @param password - The raw password string from the user.
 * @returns A promise that resolves to the hashed string.
 */
export async function hashPassword(password: string): Promise<string> {
  // Use a salt factor of 12 for a good balance between security and speed
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Verifies a password against a stored hash.
 * @param password - The raw password to check.
 * @param hash - The hashed password stored in the database.
 * @returns A promise that resolves to a boolean.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}