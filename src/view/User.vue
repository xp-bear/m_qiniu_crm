<template>
  <div>User</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);
onMounted(() => {
  // console.log($route.path);
  if ($route.path == "/user") {
    redirPath.value = "/user";
    redirIndex.value = 3;
  }
});
</script>

<style lang="scss" scoped></style>
