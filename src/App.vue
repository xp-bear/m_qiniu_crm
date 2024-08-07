<template>
  <!-- // slide-left为过度样式--向左滑动 -->
  <div class="mask" v-show="durShow">
    <span class="jump" @click="durShow = false">跳过广告 {{ numCounter }}s</span>
    <img src="./assets/adv/1.png" alt="" />
  </div>
  <!-- 主界面 -->
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" type="transition">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- 底部按钮 -->
  <Footer v-show="currentComponent"> </Footer>
</template>
<script setup>
import Footer from "@/components/Footer.vue";
import { ref, watch, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();

import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);

let currentComponent = ref(true); //当前加载哪一个组件
let transitionName = ref("slide-left"); //左边动画切换 还是 右边动画切换
let numCounter = ref(5); //5s广告
const durShow = ref(false); //加载广告
const timer = ref(null);
onMounted(() => {
  timer.value = setInterval(() => {
    numCounter.value--;
    if (numCounter.value == 0) {
      durShow.value = false;
      clearInterval(timer.value);
      // 加载动画
    }
  }, 1000);
});

watch(redirIndex, (newVal, oldVal) => {
  // console.log(newVal, oldVal);
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
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 9999;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .jump {
    width: 2.5rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.6rem;
    text-align: center;
    background-color: #cccccc60;
    position: absolute;
    color: #fff;
    top: 0.1rem;
    right: 0.1rem;
  }
}

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
  position: relative;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 300ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate(-100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
