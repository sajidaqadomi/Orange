export class GenericMethods {
  /**
   * Generate a random integer within a specified range.
   *
   * @param {number} min - The minimum value of the range .
   * @param {number} max - The maximum value of the range .
   * @returns {number} A random integer within the specified range.
   */
  static randomNumberFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * Generate a random string by appending a random number to a given word.
   *
   * @param {string} word - The word to which the random number will be appended.
   * @returns {string} A random string combining the word and a random number.
   */
  static randomString = (word: string): string => {
    return `${word}${GenericMethods.randomNumberFromInterval(1, 200)}`;
  };
}
