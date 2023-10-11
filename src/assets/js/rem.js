function remSize() {
  //document.documentElement 获取html元素
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  // 1rem=100px，设计稿是750px
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
}

remSize();

window.onresize = function () {
  remSize();
};
