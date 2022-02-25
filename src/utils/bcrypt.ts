import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Here we are calculating the hash.
 * @param plainTextPass 
 */
export const hash = (plainTextPass: string) => bcrypt.hash(plainTextPass, saltRounds);

/**
 * Here we compare the password in the database 
 * with the user provided password
 * @param plainTextPass 
 * @param hash 
 * @returns 
 */
export const compareHash = (plainTextPass: string, hash: string) => bcrypt.compare(plainTextPass, hash);
