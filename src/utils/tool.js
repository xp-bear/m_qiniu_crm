// 一个节流函数
export function throttle(func, wait) {
  let timer;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, wait);
    }
  };
}

export function test() {
  console.log("test 函数");
}
