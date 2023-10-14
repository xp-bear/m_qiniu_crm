<template>
  <div class="Home">
    <!-- 顶部搜索栏 -->
    <var-skeleton avatar title :rows="1" :loading="loadingScreen">
      <div class="search">
        <div class="avatar">
          <img src="https://cdn.xxoutman.cn/logo.jpg" alt="" />
        </div>
        <div class="ipt">
          <i class="iconfont icon-icon- sea"></i>
          <input type="text" placeholder="搜索关键字..." />
        </div>
        <div class="email">
          <i class="iconfont icon-youxiang"></i>
        </div>
      </div>

      <!-- tab 栏 -->
      <var-sticky :offset-top="0">
        <div class="tabs">
          <var-tabs v-model:active="activeTab">
            <var-tab>全部</var-tab>
            <var-tab>图片</var-tab>
            <var-tab>视频</var-tab>
            <var-tab>音乐</var-tab>
            <var-tab>压缩包</var-tab>
            <var-tab>EXE程序</var-tab>
            <var-tab>TXT文本</var-tab>
            <var-tab>DOCX文档</var-tab>
            <var-tab>XLSX表格</var-tab>
            <var-tab>PPT幻灯片</var-tab>
            <var-tab>其他项目</var-tab>
          </var-tabs>
        </div>
      </var-sticky>
    </var-skeleton>

    <var-tabs-items v-model:active="activeTab">
      <var-tab-item>
        <!-- 卡片展示 内容区域 -->
        <div class="container">
          <!-- 卡片 -->
          <div class="card" v-for="i in 18" @click="toDetail">
            <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
              <div class="box">
                <img src="http://cdn.xxoutman.cn/image-1696947443969.png?1696947444914" alt="" />
                <div class="msg">
                  <div>
                    <i class="iconfont icon-liulan-mian"></i>
                    <span>23</span>
                  </div>
                  <div>
                    <i class="iconfont icon-dianzan-mian"></i>
                    <span>523</span>
                  </div>
                </div>
              </div>
              <div class="title"><var-ellipsis style="max-width: 3.6rem" :line-clamp="2"> 其实没有什么事情是不可能的，我都拿到世界冠军了，真的没有什么事情是不可能的。 </var-ellipsis></div>
              <div class="user">
                <div>
                  <span style="background-color: #fff1ee; color: #f26b3f; padding: 0.05rem 0.1rem; border-radius: 0.1rem">视频</span>
                </div>
                <div>
                  <i class="iconfont icon-yonghu"></i>
                  <span><var-ellipsis style="max-width: 1.8rem"> 想走过亚洲的熊</var-ellipsis></span>
                </div>
              </div>
            </var-skeleton>
          </div>
        </div>
      </var-tab-item>
      <var-tab-item><div style="width: 100%; height: 5rem">图片</div></var-tab-item>
      <var-tab-item> <div style="width: 100%; height: 5rem">视频</div> </var-tab-item>
    </var-tabs-items>

    <!-- 回到顶部 -->
    <var-back-top :duration="300" right="28" bottom="60" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex, scrollPageY } = storeToRefs(store);

const activeTab = ref(0); //tab栏的切换
const loadingScreen = ref(true); //骨架屏的加载
const leftScreen = ref(false); //右侧弹出副屏

onMounted(() => {
  if ($route.path == "/home") {
    redirPath.value = "/home";
    redirIndex.value = 0;
  }
  window.addEventListener("scroll", doScroll);
  setTimeout(() => {
    window.scrollTo({
      top: scrollPageY.value,
      behavior: "auto", // 可以使用 'auto' 或 'smooth' 来控制滚动的平滑度
    });
  }, 800);
});

onUnmounted(() => {
  window.removeEventListener("scroll", doScroll);
});
const doScroll = () => {
  scrollPageY.value = window.scrollY; //pinia赋值
  // console.log(scrollPageY.value);
};

setTimeout(() => {
  loadingScreen.value = false; // 数据加载完成后将加载状态设置为 false
}, 300); // 模拟2秒后加载完成

const toDetail = () => {
  router.push({ path: "/detail", query: { id: "20234" } });
  redirPath.value = "/detail";
  redirIndex.value = 5; //如果是5 表示不显示tab栏
};
</script>

<style lang="less" scoped>
.Home {
  width: 7.5rem;
  :deep(.var-skeleton__card) {
    margin-bottom: 0;
  }
  // padding-bottom: 1rem;

  .search {
    width: 7.5rem;
    height: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.3rem 0;
    background-color: #fff;
    .avatar {
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    .ipt {
      box-sizing: border-box;
      height: 0.6rem;
      position: relative;
      &::placeholder {
      }
      input {
        box-sizing: border-box;
        width: 5rem;
        height: 100%;
        border: 0;
        outline: none;
        background-color: #f1f2f4;
        border-radius: 0.6rem;
        padding-left: 0.7rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
      }
      .sea {
        position: absolute;
        font-size: 0.32rem;
        z-index: 1;
        left: 0.25rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .email {
      i {
        font-size: 0.5rem;
        color: #797e81;
      }
    }
  }
  .tabs {
    width: 7.5rem;
  }
  .container {
    box-sizing: border-box;
    width: 7.5rem;
    background-color: #f1f2f4;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0.1rem 0.1rem 1rem;
    .card {
      width: 3.6rem;
      height: 3.2rem;
      border-radius: 0.2rem;
      background-color: #fff;
      margin-bottom: 0.2rem;
      overflow: hidden;
      .box {
        position: relative;
        img {
          width: 100%;
          height: 1.94rem;
          object-fit: cover;
          vertical-align: middle;
        }
        .msg {
          box-sizing: border-box;
          width: 100%;
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          font-size: 0.24rem;
          color: #fff;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
          padding: 0.1rem;
          i {
            font-size: 0.24rem;
            margin-right: 0.1rem;
          }
        }
      }
      .title {
        padding: 0 0.1rem;
        font-size: 0.28rem;
        font-family: "consolas";
      }
      .user {
        box-sizing: border-box;
        width: 100%;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        font-size: 0.24rem;
        color: #989ca1;
        padding: 0.1rem;
        i {
          font-size: 0.24rem;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>
