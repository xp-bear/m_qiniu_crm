import { defineStore } from "pinia";
export const useStore = defineStore("storeId", {
  state: () => {
    return {
      redirPath: "", //跳转路由地址
      redirIndex: -1, //跳转路由地址索引
    };
  },
  getters: {
    //有缓存机制，几乎和vuex是一样的
  },
  actions: {
    //几乎也没有什么变化
    // upNum(val) {
    //   this.counter += val;
    // },
  },
});
