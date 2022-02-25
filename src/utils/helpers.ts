export const randomNumber = (min: number = 0, max: number = Date.now()): number => {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}