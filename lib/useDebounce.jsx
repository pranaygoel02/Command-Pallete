export default function useDebounce(fnc, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fnc.apply(context, args);
      }, delay);
    };
  }