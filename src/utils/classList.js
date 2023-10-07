/** Creates a string of space-separated class names. */
export default function classList(...classNames) {
  return classNames
    .filter((className) => typeof className === 'string')
    .join(' ')
    .trim();
}
