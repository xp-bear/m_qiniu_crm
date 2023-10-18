<template>
  <div class="Home" ref="homeContent">
    <!-- 顶部搜索栏 -->
    <var-skeleton avatar title :rows="1" :loading="loadingScreen">
      <div class="search">
        <div class="avatar">
          <img src="https://cdn.xxoutman.cn/logo.jpg" alt="" />
        </div>
        <div class="ipt">
          <i class="iconfont icon-icon- sea" @click="handleEnterKey"></i>
          <input type="text" placeholder="搜索关键字..." v-model="searchKey" @keyup.enter="handleEnterKey" />
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

    <keep-alive>
      <var-tabs-items v-model:active="activeTab" @change="tabChange">
        <keep-alive>
          <var-tab-item>
            <!-- 卡片展示 内容区域 -->
            <div class="container">
              <!-- 卡片 -->
              <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
                <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                  <div class="box">
                    <!--  图片  -->
                    <div v-show="['.jpg', '.svg', '.png', '.jpeg'].includes(item.file_suffix)">
                      <img :src="item.file_link" alt="" />
                    </div>
                    <!--  视频 -->
                    <div v-show="['.mp4'].includes(item.file_suffix)">
                      <video style="width: 100%; height: 1.94rem" playsinline preload="metadata">
                        <source :src="item.file_link + '#t=0.1'" type="video/mp4" />
                        当前浏览器不支持 video直接播放
                      </video>

                      <!-- <video :src="item.file_link" style="width: 100%; height: 1.94rem" preload="metadata"></video> -->
                    </div>
                    <!-- 音乐 -->
                    <div v-show="['.mp3'].includes(item.file_suffix)">
                      <img src="../assets/imgs/music.gif" alt="" />
                    </div>
                    <!-- 文本 -->
                    <div v-show="['.txt', '.js', '.py'].includes(item.file_suffix)">
                      <img src="../assets/imgs/txt.gif" alt="" />
                    </div>
                    <!-- 压缩包 -->
                    <div v-show="['.zip', '.rar', '.7z'].includes(item.file_suffix)">
                      <img src="../assets/imgs/zip.gif" alt="" />
                    </div>
                    <!-- exe文件 -->
                    <div v-show="['.exe'].includes(item.file_suffix)">
                      <img src="../assets/imgs/exe.gif" alt="" />
                    </div>
                    <div class="msg">
                      <div>
                        <i class="iconfont icon-liulan-mian"></i>
                        <span>{{ item.file_view }}</span>
                      </div>
                      <div>
                        <i class="iconfont icon-dianzan-mian"></i>
                        <span>523</span>
                      </div>
                    </div>
                  </div>
                  <div class="title">
                    <var-ellipsis style="max-width: 3.6rem" :line-clamp="2"> {{ item.file_name.slice(0, -14) || "" }} </var-ellipsis>
                  </div>
                  <div class="user">
                    <div>
                      <!-- 标签展示 -->
                      <span style="background-color: #eaffff; color: #23aaf2; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="['.svg', '.jpg', '.png', '.jpeg'].includes(item.file_suffix)">
                        图片
                      </span>
                      <span style="background-color: #ffffd9; color: #ffc743; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="['.txt', '.js', '.py'].includes(item.file_suffix)"> 文本 </span>
                      <span style="background-color: #fff1ee; color: #f26b3f; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="['.mp4'].includes(item.file_suffix)">视频</span>
                      <span style="background-color: #e1ffff; color: #00ddb3; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="['.mp3'].includes(item.file_suffix)">音乐</span>
                      <span style="background-color: #ffe5ff; color: #ec4f8c; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="['.zip', '.rar', '.7z'].includes(item.file_suffix)">压缩包</span>
                      <span style="background-color: #ffd0ff; color: #4608ad; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="['.exe'].includes(item.file_suffix)">exe</span>
                    </div>
                    <div>
                      <i class="iconfont icon-yonghu"></i>
                      <span>
                        <var-ellipsis style="max-width: 1.8rem"> {{ item.file_user_name }}</var-ellipsis>
                      </span>
                    </div>
                  </div>
                </var-skeleton>
              </div>
            </div>
          </var-tab-item>
        </keep-alive>
        <var-tab-item><div style="width: 100%; height: 100vh">图片</div></var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">视频</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">音乐</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">压缩包</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">EXE程序</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">TXT文本</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">DOCX文档</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">XLSX表格</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">PPT幻灯片</div> </var-tab-item>
        <var-tab-item> <div style="width: 100%; height: 100vh">其他项目</div> </var-tab-item>
      </var-tabs-items>
    </keep-alive>
    <!-- [['.jpg','.jpeg','.png','.ico','.svg'],['.mp4'],['.mp3'],['.zip','.7z','.rar'],['.exe'],['.docx','.doc'],['.xlsx','.xls'],['.pptx','.ppt'],['other']] -->
    <!-- 回到顶部 -->
    <var-back-top :duration="300" right="28" bottom="60" />
    <div class="loading" v-show="loadState">
      <!-- 加载更多 -->
      <var-loading type="circle" />
    </div>
  </div>
</template>

<script setup>
import { CONFIG } from "../config/constant";
import { m_searchfile } from "@/api/index.js";
import { throttle, test } from "../utils/tool";
import { LoadingBar } from "@varlet/ui";
import { ref, onMounted, computed, onUnmounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex, scrollPageY } = storeToRefs(store);

const homeContent = ref(); //home dom元素
const loadState = ref(false); //触底加载状态显示。

const activeTab = ref(0); //tab栏的切换
const loadingScreen = ref(true); //骨架屏的加载

const searchKey = ref(""); //搜索栏的value值
const cardDatas = ref(["", "", "", "", "", "", "", ""]); //卡片列表数据
const pageIndex = ref(0); //请求页面的limit
const pageTotal = ref(0); //每一页的总共条数
// 监听回车健
function handleEnterKey() {
  console.log(searchKey.value);
}

// 请求数据
function getData() {
  let data = {
    keword: searchKey.value, //搜索栏
    tabindex: CONFIG.FILE_TYPE[activeTab.value], //哪一个tab栏目
    pageindex: pageIndex.value, //请求页面的limit
    pagetotal: pageTotal.value, //每一页的总共条数
  };
  console.log("请求参数: ", data);
  // 请假数据加载
  m_searchfile({ keyword: searchKey.value }).then((res) => {
    cardDatas.value = res.message;
    pageIndex.value = Math.floor(cardDatas.value.length / 20); //修改加载下一页的数据
    loadingScreen.value = false; // 数据加载完成后将加载状态设置为 false
  });
}

// 页面数据加载
onMounted(() => {
  LoadingBar.start(); //开始加载条。
  getData(); //数据加载

  if ($route.path == "/home") {
    redirPath.value = "/home";
    redirIndex.value = 0;
  }
  // 监听页面滚动
  window.addEventListener("scroll", doScroll);

  setTimeout(() => {
    window.scrollTo({
      top: scrollPageY.value,
      behavior: "auto", // 可以使用 'auto' 或 'smooth' 来控制滚动的平滑度
    });
    LoadingBar.finish(); //结束加载条。
  }, 800);
});

// 节流函数
const throttledFunction = throttle(function (scrollY, bottomHeight, windowHeight) {
  loadState.value = true;

  console.log("滚动到底部，可以加载更多内容", scrollY, bottomHeight, windowHeight); //逻辑处理函数
}, 1000);

const doScroll = () => {
  scrollPageY.value = window.scrollY; //pinia赋值

  const scrollY = parseInt(window.scrollY); //页面滚动距离
  const windowHeight = homeContent.value.clientHeight; //页面高度
  const bottomHeight = 680; //底部button的高度。
  if (scrollY + bottomHeight >= windowHeight) {
    // 滚动到底部，可以加载更多内容
    throttledFunction(scrollY, bottomHeight, windowHeight);
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", doScroll);
});

// 跳转detail页面
const toDetail = (item) => {
  router.push({ path: "/detail", query: item });
  redirPath.value = "/detail";
  redirIndex.value = 5; //如果是5 表示不显示tab栏
};

// tab栏切换,索引也切换
function tabChange(active) {
  activeTab.value = active;
  console.log("tab栏切换索引:", CONFIG.FILE_TYPE[activeTab.value]);
}
</script>

<style lang="less" scoped>
.Home {
  position: relative;
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
        height: 1.94rem;
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
        height: 0.72rem;
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
  .loading {
    position: relative;
    bottom: 1rem;
  }
}
</style>
