<template>
  <div class="Detail">
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
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);
const toBack = () => {
  redirPath.value = "/home"; //pinia 赋值
  redirIndex.value = -1; //pinia 赋值
  router.go(-1);
};
</script>

<style lang="less" scoped>
.Detail {
  width: 100%;
  min-height: 100vh;
}
</style>
