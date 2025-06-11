<template>
  <div class="Share" ref="scrollContainer">
    <!-- 顶部导航栏 -->
    <var-skeleton rows="1" :loading="loading">
      <div class="nav">图文共享中心</div>
    </var-skeleton>
    <!-- 数据分享区域  2行瀑布流 -->
    <div class="waterfall">
      <!-- 判断文件展示类型 -->

      <div class="item" v-for="item in listDatas" :key="item.file_id" @click="toDetail(item)">
        <!-- 0  图片  -->
        <var-skeleton card :rows="0" :loading="loading">
          <div v-if="item.file_type == 0">
            <img :src="item.file_link.split('?')[0] + '?x-oss-process=image/resize,w_200'" alt="Image" />
          </div>
        </var-skeleton>
        <!--1 视频  -->
        <var-skeleton card :rows="0" :loading="loading">
          <div v-if="item.file_type == 1" class="waterfall-video">
            <i class="iconfont icon-yk_shipin"></i>
            <video playsinline preload="metadata">
              <source :src="item.file_link + '#t=0.1'" type="video/mp4" style="object-position: top center; object-fit: cover" />
              当前浏览器不支持 video直接播放
            </video>
          </div>
        </var-skeleton>
        <!-- 其他的不显示,只显示图片与视频 -->
      </div>
    </div>
    <!-- 加载状态 -->
    <var-loading type="cube" v-if="bottomLoading" style="padding: 5px 0" />
    <!-- 加载完毕的状态.没有更多数据了 -->
    <var-button v-if="isBottomState" block type="default" size="small" text disabled>已经到底了啦!</var-button>

    <!-- 居中弹出层 -->
    <var-popup v-model:show="centerPopup" position="right" style="width: 100%; height: 100vh" @touchstart="startSwipe" @touchmove="detectSwipe" @touchend="endSwipe" @closed="clearPopupData">
      <!-- 头部标签栏 -->
      <var-app-bar title="共享数据展示面板" style="position: fixed; z-index: 2">
        <template #left>
          <var-button color="transparent" text-color="#fff" round text @click="backShare">
            <var-icon name="chevron-left" :size="24" />
          </var-button>
        </template>
        <template #right>
          <div style="padding-right: 0.1rem">{{ formatBytes(centerPopupData.file_size) || "0kb" }}</div>
        </template>
      </var-app-bar>
      <div style="width: 100%; height: 1.08rem"></div>
      <!-- 数据展示页 -->
      <div v-if="centerPopupData.file_type == 0">
        <img :src="centerPopupData.file_link" alt="Image" style="width: 100%" />
      </div>
      <div v-if="centerPopupData.file_type == 1" class="waterfall-video">
        <video playsinline preload="metadata" style="width: 100%" autoplay controls>
          <source :src="centerPopupData.file_link + '#t=0.1'" type="video/mp4" style="object-position: top center; object-fit: cover" />
          当前浏览器不支持 video直接播放
        </video>
      </div>

      <!-- 浏览显示 -->
      <div style="display: flex; flex: 1; justify-content: space-between; padding: 0 1rem; font-size: 0.28rem; margin-bottom: 0.1rem">
        <div style="display: flex; align-items: center; margin-right: 0.1rem">
          <span style="margin-right: 0.08rem">收藏量:</span>
          <i @click="tolike(centerPopupData)" :style="likeStyle" class="iconfont icon-mn_shoucang_fill"> </i>
          <span :style="textStyle">{{ centerPopupData.file_likes }}</span>
        </div>
        <div style="display: flex; align-items: center; vertical-align: bottom">
          <span style="margin-right: 0.08rem">浏览量:</span>
          <i style="font-size: 0.4rem; color: #61666c; margin-right: 0.02rem" class="iconfont icon-in_zhengyan_fill"></i>
          <span style="font-size: 0.26rem; color: #61666c">{{ centerPopupData.file_views }}</span>
        </div>
      </div>

      <!-- 底部复制按钮 -->
      <div style="display: flex; justify-content: space-evenly; padding-bottom: 10px">
        <var-button type="primary" style="width: 45%" @click="copyLink(centerPopupData.file_link)">复制文件链接</var-button>
        <var-button type="info" style="width: 45%" @click="displayInfo">下方显示详细信息</var-button>
      </div>

      <!-- 详细信息显示界面 -->
      <div v-show="footFlag">
        <ul style="font-size: 14px">
          <li style="margin-bottom: 0.1rem">
            <span style="width: 1rem">文件名称: </span> <var-ellipsis style="max-width: 80%; background-color: antiquewhite"> {{ centerPopupData.file_name }} </var-ellipsis>
          </li>

          <li style="margin-bottom: 0.1rem">
            分享时间: <span style="background-color: antiquewhite">{{ dayjs(centerPopupData.file_createtime).format("YYYY-MM-DD HH:mm:ss") }}</span>
          </li>
          <li style="margin-bottom: 0.1rem">
            分享者:&emsp; <span style="background-color: antiquewhite">{{ centerPopupData.file_user_name }}</span>
          </li>
        </ul>
      </div>
    </var-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect, nextTick, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs"; // ES 2015
import { mSearchShareFileApi, minsertviewApi, minsertlikeApi, msearchlikefileApi, minsertlikefileApi } from "../api/index";
import { formatBytes } from "../utils/tool";
import { Snackbar, Dialog } from "@varlet/ui";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);

const loading = ref(true); //骨架屏加载数据。

const scrollContainer = ref(null); //滚动的div元素
const bottomLoading = ref(false); //触底加载
const isBottomState = ref(false); //触底加载,已经到底啦
const currentPage = ref(0); //当前加载的页面
const currentPageTotal = ref(10); //当前加载的每一页的总条数10个数据
const listDatas = ref([]); //列表瀑布流的数据

const centerPopup = ref(false); //居中弹出层状态
const centerPopupData = ref([]); //居中弹出层里面数据
const footFlag = ref(false); //详情显示状态

const likeColor = ref(false); //点击红心的状态

let startX = ref(null); //手指左滑距离

// 收藏红心样式
const likeStyle = computed(() => ({
  color: likeColor.value ? "red" : "#7c8085",
  "margin-right": "0.02rem",
  "font-size": "0.32rem",
}));
// 收藏红心文本样式
const textStyle = computed(() => ({
  color: likeColor.value ? "red" : "#61666c",
  "margin-right": "0.02rem",
  "font-size": "0.26rem",
}));

const userObj = ref({}); //用户信息对象
// ---------------------------------------------------

// 左滑关闭按钮。
const startSwipe = (event) => {
  startX.value = event.touches[0].clientX;
};

const detectSwipe = (event) => {
  if (startX.value) {
    const currentX = event.touches[0].clientX;
    const deltaX = startX.value - currentX;
    if (deltaX < -70) {
      // 清除物理按键返回键的空值
      window.history.back();
      // 滑动距离超过50个像素，表示左滑
      retHome();
      startX.value = null;
    }
  }
};

const endSwipe = () => {
  startX.value = null;
};

onMounted(() => {
  // console.log($route.path);
  if ($route.path == "/share") {
    redirPath.value = "/share";
    redirIndex.value = 2;
  }

  window.addEventListener("scroll", checkScroll);
  loadMore(); // 初始加载

  userObj.value = JSON.parse(localStorage.getItem("userObj")); //获取到当前用户信息
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});

// 点赞+1   // 当前打开的共享文件
function tolike(item) {
  // console.log(userObj.value.id, item.file_user_id);
  if (userObj.value.id == item.file_user_id) {
    return Snackbar({ type: "warning", content: "不可对自己文件收藏", duration: 1000 });
  }
  // 判断用户有没有对该文件收藏
  msearchlikefileApi({ favorite_user_id: userObj.value.id, favorite_file_id: item.file_id }).then((rs) => {
    if (rs.msg.length == 0) {
      // 没有收藏过  先修改对应的file表的likes记录
      minsertlikeApi({ file_id: item.file_id }).then((res) => {
        centerPopupData.value.file_likes += 1;
        likeColor.value = true; // 切换收藏红心状态
        Snackbar({ type: "success", content: "收藏成功", duration: 1000 });
      });

      // 在favorite表格添加一条收藏记录
      minsertlikefileApi({ favorite_user_id: userObj.value.id, favorite_file_id: item.file_id, favorite_createtime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss") });
    }
  });
}

// 复制文本链接的函数
function copyLink(value) {
  // 创建一个新的 textarea 元素
  var textarea = document.createElement("textarea");
  // 设置 textarea 的内容为要复制的文字
  textarea.value = value;
  // 将 textarea 添加到文档中
  document.body.appendChild(textarea);
  // 选中 textarea 的内容
  textarea.select();
  // 执行复制命令
  document.execCommand("copy");
  // 移除 textarea 元素
  document.body.removeChild(textarea);
  Snackbar({
    type: "success",
    content: "链接已经复制到粘贴板",
    duration: 1000,
  });
}
// 点击详情按钮,显示详细信息
function displayInfo() {
  footFlag.value = true; //详情展示
}

// 点击跳转到详情页
function toDetail(item) {
  centerPopup.value = true; //打开弹出层

  // 判断用户有没有对该文件收藏,渲染红心状态
  msearchlikefileApi({ favorite_user_id: userObj.value.id, favorite_file_id: item.file_id }).then((rs) => {
    // 有收藏过
    if (rs.msg.length != 0) {
      likeColor.value = true; //收藏过就是红心
    }
  });

  // 增加浏览量接口
  minsertviewApi({ file_id: item.file_id }).then((res) => {
    item.file_views += 1;
    centerPopupData.value = item; //居中弹出层数据赋值
  });

  //挂载成功后给pop事件绑定一个方法 // 如果支持 popstate （一般移动端都支持）
  if (window.history && window.history.pushState) {
    // 往历史记录里面添加一条新的当前页面的url
    history.pushState(null, null, document.URL);
    // 给 popstate 绑定一个方法用来监听页面返回
    window.addEventListener("popstate", retHome, false); //false阻止默认事件
  }
}

// 关闭弹出层动画结束时触发 清除数据
function clearPopupData() {
  centerPopupData.value = ""; //清除弹出层数据。
  footFlag.value = false; //重置详情的打开状态
  likeColor.value = false; //清空红心
}

// 返回分享页
function backShare() {
  centerPopup.value = false; // 关闭弹出层的状态
}
const retHome = () => {
  centerPopup.value = false; // 关闭弹出层的状态
  //组件销毁后清除事件
  window.removeEventListener("popstate", retHome, false); //false阻止默认事件
};
// 触底加载更多的数据
const loadMore = () => {
  if (bottomLoading.value) return;
  bottomLoading.value = true;

  try {
    let data = { page_index: currentPage.value * currentPageTotal.value, page_total: currentPageTotal.value };
    mSearchShareFileApi(data).then((res) => {
      if (res.msg.length == 0) {
        // return Snackbar.warning({ content: "暂无更多数据！", duration: 1000 });
        isBottomState.value = true; //显示加载到底的按钮
      }
      listDatas.value = [...listDatas.value, ...res.msg]; //拼接数据
      // 数组对象去重
      listDatas.value = [...new Set(listDatas.value.map((item) => JSON.stringify(item)))].map((str) => JSON.parse(str));
      currentPage.value++; //页面＋1

      loading.value = false; //模态框的消除
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    bottomLoading.value = false; //触底加载状态消失。
  }
};

// 监听滚动事件
const checkScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5) {
    loadMore(); //加载数据
  }
};
</script>

<style lang="less" scoped>
.Share {
  padding: 0 0.1rem 1rem;
  min-height: 100vh;
  background-color: #eeeeee;
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
  .waterfall {
    column-count: 2;
    column-gap: 0.1rem;
    background-color: #eeeeee;
    .item {
      margin-bottom: 0.03rem;
      break-inside: avoid;
      img {
        width: 100%;
        overflow: hidden;
        border-radius: 0.1rem;
      }
    }
    .waterfall-video {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        border-radius: 0.1rem;
        width: 100%;
        height: 98.6%;
        background-color: rgba(0, 0, 0, 0.3);
      }
      video {
        width: 100%;
        border-radius: 0.1rem;
      }
      .iconfont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 52px;
        color: #fff;
        box-shadow: 0 0 3px #ccc;
        border-radius: 50%;
      }
    }
  }
}
</style>
