<template>
  <!-- <div class="Footer"> -->
  <var-bottom-navigation v-model:active="redirIndex" :fixed="true" @change="changeBtn">
    <var-bottom-navigation-item label="我的空间">
      <template #icon>
        <var-icon class="iconfont icon-mn_kongjian_fill" />
      </template>
    </var-bottom-navigation-item>
    <var-bottom-navigation-item label="上传数据">
      <template #icon>
        <var-icon class="iconfont icon-mn_shangchuantupian_fill" />
      </template>
    </var-bottom-navigation-item>
    <var-bottom-navigation-item label="共享中心">
      <template #icon>
        <var-icon class="iconfont icon-mn_jifen_fill" />
      </template>
    </var-bottom-navigation-item>
    <var-bottom-navigation-item label="我的">
      <template #icon>
        <var-icon class="iconfont icon-mn_wo_fill" />
      </template>
    </var-bottom-navigation-item>
  </var-bottom-navigation>
  <!-- </div> -->
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
import { onUpdated } from "vue";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);

const activeBtn = ref(null); //标签序号
let timer = ref(null); //定时器
onMounted(() => {
  // activeBtn.value = 0; //默认选中我的空间页面
  // activeBtn.value = redirIndex.value;
  // timer = setTimeout(() => {
  // activeBtn.value = redirIndex.value;
  // }, 300);
});

//切换底部按钮导航
const changeBtn = (id) => {
  console.log(id); //根据id 切换标签
  // activeBtn.value = id;

  if (id == 0) {
    router.push("/home");
    redirPath.value = "/home";
    redirIndex.value = 0;
  } else if (id == 1) {
    router.push("/upload");
    redirPath.value = "/upload";
    redirIndex.value = 1;
  } else if (id == 2) {
    router.push("/share");
    redirPath.value = "/share";
    redirIndex.value = 2;
  } else if (id == 3) {
    router.push("/user");
    redirPath.value = "/user";
    redirIndex.value = 3;
  }
};

// 监听底部导航栏状态的切换
// watch(activeBtn, (newVal, oldVal) => {
//   switch (newVal) {
//     case 0:
//       router.push("/home");
//       redirPath.value = "/home";
//       redirIndex.value = 0;
//       break;
//     case 1:
//       router.push("/upload");
//       redirPath.value = "/upload";
//       redirIndex.value = 1;
//       break;
//     case 2:
//       router.push("/share");
//       redirPath.value = "/share";
//       redirIndex.value = 2;
//       break;
//     case 3:
//       router.push("/user");
//       redirPath.value = "/user";
//       redirIndex.value = 3;
//       break;
//     default:
//       break;
//   }
// });
</script>

<style lang="less" scoped>
:deep(.var-bottom-navigation-item--active .var-bottom-navigation-item__label) {
  font-family: "consolas";
}
.Footer {
  width: 7.5rem;
  height: 1rem;
  z-index: 2;
}
</style>
