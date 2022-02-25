
/**
 * Generates random number generator from min to max.
 * @param min Lower bound
 * @param max Upper bound
 * @returns random number
 */
export const randomNumber = (min: number = 0, max: number = Date.now()): number => {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}