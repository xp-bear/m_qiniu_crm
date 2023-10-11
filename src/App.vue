<template>
  <!-- // slide-left为过度样式--向左滑动 -->
  <!-- <transition >
    <router-view ></router-view>
  </transition> -->

  <router-view v-slot="{ Component }">
    <transition :name="transitionName" type="transition">
      <component :is="Component" />
    </transition>
  </router-view>

  <Footer v-show="currentComponent"></Footer>
  <!-- 使用动态组件根据条件渲染不同的组件 -->
  <!-- <component :is="currentComponent"></component> -->
</template>
<script setup>
import Footer from "@/components/Footer.vue";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();

import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);

let currentComponent = ref(true); //当前加载哪一个组件
let transitionName = ref("slide-left"); //左边动画切换 还是 右边动画切换
watch(redirIndex, (newVal, oldVal) => {
  if (newVal > oldVal) {
    transitionName.value = "slide-left";
  } else {
    transitionName.value = "slide-right";
  }
});
watch(
  redirPath,
  (newVal, oldVal) => {
    if (newVal == "/detail") {
      currentComponent.value = false;
    } else {
      currentComponent.value = true;
    }
  },
  { immediate: true }
);
</script>

<style lang="less">
@font-face {
  font-family: xp;
  src: url("http://cdn.xxoutman.cn/two.ttf");
}
@font-face {
  font-family: consolas;
  src: url("http://cdn.xxoutman.cn/one.ttf");
}
#app {
  width: 7.5rem;
  margin: 0 auto;
  min-height: 100vh;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
