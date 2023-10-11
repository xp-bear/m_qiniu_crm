<template>
  <div class="Upload">
    <!-- 顶部导航栏 -->
    <div class="nav">文件上传</div>
    <!-- 标题展示 -->
    <div class="title">
      <div class="info">
        <div>
          <i class="iconfont icon-xiangji"></i>
        </div>
        <span>拍照上传</span>
      </div>
      <div class="line"></div>
      <div class="info">
        <div>
          <i class="iconfont icon-shangchuan1"></i>
        </div>
        <span>本地上传</span>
      </div>
    </div>

    <!-- 选择上传方式 -->
    <div class="uploadTitle">选择上传方式</div>
    
  </div>
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
  if ($route.path == "/upload") {
    redirPath.value = "/upload";
    redirIndex.value = 1;
  }
});
</script>

<style lang="less" scoped>
.Upload {
  width: 7.5rem;
  min-height: 100vh;
  .nav {
    box-sizing: border-box;
    font-family: "consolas";
    text-align: center;
    width: 100%;
    height: 0.9rem;
    background-color: #fff;
    line-height: 0.9rem;
    font-weight: 600;
    border-bottom: 0.1rem solid #eeeeee;
  }
  .title {
    display: flex;
    justify-content: center;
    padding: 0.1rem 0;
    .info {
      width: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        width: 1rem;
        height: 1rem;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        i {
          font-size: 0.5rem;
          color: #5376fa;
        }
      }
      span {
        font-size: 0.28rem;
      }
    }
    .line {
      width: 1.5rem;
      height: 0.03rem;
      background-color: #7a9aff;
      margin-top: 0.5rem;
    }
  }
  .uploadTitle {
    box-sizing: border-box;
    font-size: 0.32rem;
    font-weight: 600;
    padding: 0.2rem;
  }
}
</style>
