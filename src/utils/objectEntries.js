/**
 * @template T, U
 * @param {Object.<string, T>} object
 * @param {(value: T, key?: string) => U} callback
 * @return {Object.<string, U>}
 */
export function mapEntryValues(object, callback) {
  return Object.fromEntries(
    Object.entries(object)
      .map(([key, value]) => [key, callback(value, key)])
  );
}
