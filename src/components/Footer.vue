<template>
  <var-bottom-navigation v-model:active="activeBtn" :fixed="true" @change="changeBtn">
    <var-bottom-navigation-item label="我的空间">
      <template #icon>
        <var-icon class="iconfont icon-yunkongjian" />
      </template>
    </var-bottom-navigation-item>
    <var-bottom-navigation-item label="上传数据">
      <template #icon>
        <var-icon class="iconfont icon-shangchuan" />
      </template>
    </var-bottom-navigation-item>
    <var-bottom-navigation-item label="共享中心">
      <template #icon>
        <var-icon class="iconfont icon-hangzhengguanli" />
      </template>
    </var-bottom-navigation-item>
    <var-bottom-navigation-item label="我的">
      <template #icon>
        <var-icon class="iconfont icon-wode" />
      </template>
    </var-bottom-navigation-item>
  </var-bottom-navigation>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);

const activeBtn = ref(0); //标签序号

//切换底部按钮导航
const changeBtn = (id) => {
  activeBtn.value = id;
  redirIndex.value = id; //pinia赋值
};

// 监听底部导航栏状态的切换
watch(activeBtn, (newVal, oldVal) => {
  switch (newVal) {
    case 0:
      router.push("/home");
      redirPath.value = "/home";
      break;
    case 1:
      router.push("/upload");
      redirPath.value = "/upload";
      break;
    case 2:
      router.push("/share");
      redirPath.value = "/share";
      break;
    case 3:
      router.push("/user");
      redirPath.value = "/user";
      break;
    default:
      break;
  }
});
</script>

<style lang="less" scoped>
:deep(.var-bottom-navigation-item--active .var-bottom-navigation-item__label) {
  font-family: "consolas";
}
</style>
