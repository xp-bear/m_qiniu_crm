<template>
  <div class="Detail" @touchstart="startSwipe" @touchmove="detectSwipe" @touchend="endSwipe">
    <var-app-bar :title="$route.query.id">
      <template #left>
        <var-button color="transparent" text-color="#fff" round text @click="toBack">
          <var-icon name="chevron-left" :size="24" />
        </var-button>
      </template>
    </var-app-bar>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex, scrollPageY } = storeToRefs(store);

let startX = ref(null); //手指左滑距离

// dom元素加载完成
onMounted(() => {
  if ($route.path == "/detail") {
    redirPath.value = "/detail";
    // redirIndex.value = -1;
  }
});

// 返回按钮点击
const toBack = () => {
  let temp = scrollPageY.value;
  router.push("/home");
  redirPath.value = "/home"; //pinia 赋值
  redirIndex.value = 0; //pinia 赋值
  setTimeout(() => {
    scrollPageY.value = temp;
  }, 800); //返回上一页的时候,滚轮回到指定位置
};

const startSwipe = (event) => {
  startX.value = event.touches[0].clientX;
};

const detectSwipe = (event) => {
  if (startX.value) {
    const currentX = event.touches[0].clientX;
    const deltaX = startX.value - currentX;
    if (deltaX < -50) {
      // 滑动距离超过50个像素，表示左滑
      handleLeftSwipe();
      startX.value = null;
    }
  }
};

const endSwipe = () => {
  startX.value = null;
};

// 处理左滑事件
const handleLeftSwipe = () => {
  // 可以在这里触发你的自定义逻辑或者导航到其他页面
  toBack(); //调用返回函数
};
</script>

<style lang="less" scoped>
.Detail {
  width: 7.5rem;
  min-height: 100vh;
  background-color: #fff;
}
</style>
