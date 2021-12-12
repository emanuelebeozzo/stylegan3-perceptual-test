/**
 * Base class for all controllers. Contains useful methods.
 */
export class CommonController {
  constructor() {}

  /**
   * Function that extract the various id returned by Mongoose from an array
   * @param array from which to extract ids
   */
  static extractIds(array: Array<any>) {
    array.forEach(function(part:any, index:any, arr:any) {
      arr[index] = arr[index]._id.toString();
    });
  }

  /**
   * Function to shuffle an array in a random way 
   * @param array to shuffle
   */
  static shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
}