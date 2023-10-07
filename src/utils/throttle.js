export default function throttle(cb, delay = 1) {
  let waiting = false;

  return function throttledFunc(...args) {
    if (waiting) return;
    cb(...args);
    waiting = true;
    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}
