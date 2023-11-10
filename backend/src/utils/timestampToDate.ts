/**
 *
 * @param timestamp
 * @returns string in format "yyyy/mmm/dd"
 */
export function timestampToDate(timestamp: number) {
  try {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  } catch (err) {
    // silent....
    return "";
  }
}
