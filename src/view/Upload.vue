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
    <div class="seleet">
      <input type="file" accept="image/*" capture="environment" ref="fileInput" style="display: none" @change="handleFileInputChange" />
      <div class="region" @click="openCamera">
        <i class="iconfont icon-xiangji"></i>
        <span>拍照</span>
      </div>
      <div class="region">
        <!-- 本地上传 -->
        <i class="iconfont icon-shangchuan1"></i>
        <span>选择文件</span>
      </div>
    </div>

    <!-- 文件预览 -->
    <div class="uploadTitle">文件预览</div>
    <!-- <div class="preview"> -->
    <!-- <img src="https://cdn.xxoutman.cn/logo.jpg" alt="" /> -->
    <!-- </div> -->
    <div class="preview2">
      <var-image-preview :images="images" v-model:show="show" />
      <var-button type="primary" block @click="clickPre">预览文件</var-button>
    </div>

    <!-- 文本域 -->

    <div class="area">
      <var-input variant="outlined" placeholder="文本名称" v-model="valueName" size="small" style="margin-bottom: 0.2rem" />
      <var-input variant="outlined" placeholder="文件备注信息" textarea v-model="valueArea" rows="3" size="small" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Snackbar } from "@varlet/ui";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);

let valueArea = ref(""); //文本域
let valueName = ref(""); //文本域名称
let imageData = ref(""); //图片链接
let fileInput = ref(null); //上传文本的ref

const show = ref(false); //显示图片的遮罩层
const images = ref([]); //显示图片的链接。 可以多张

onMounted(() => {
  if ($route.path == "/upload") {
    redirPath.value = "/upload";
    redirIndex.value = 1;
  }
});

// 预览文件按钮点击。
function clickPre() {
  if (imageData.value.length == 0) {
    Snackbar({
      content: "请先上传文件",
      duration: 1000,
      type: "error",
    });
  } else {
    show.value = true;
  }
}

function openCamera() {
  fileInput.value.click(); // 触发文件选择对话框
}
function handleFileInputChange(event) {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imageData.value = e.target.result;
      console.log(imageData.value);
      images.value.push(imageData.value);
    };

    reader.readAsDataURL(file);
  }
}
</script>

<style lang="less" scoped>
.Upload {
  width: 7.5rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
  background-color: #fff;
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
  .seleet {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    .region {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 3.45rem;
      height: 2rem;
      border: 1px dashed #a3a3a3;
      border-radius: 0.1rem;
      box-sizing: border-box;

      i {
        width: 1rem;
        height: 1rem;
        background-color: #eeeeee;
        font-size: 0.44rem;
        color: #989898;
        text-align: center;
        line-height: 1rem;
        border-radius: 50%;
      }
      span {
        font-size: 0.28rem;
        color: #acacac;
        margin-top: 0.1rem;
      }
    }
  }
  .preview {
    box-sizing: border-box;
    width: 7.1rem;
    margin: 0.2rem;
    height: 4rem;
    background-color: #ccc;
    overflow-y: scroll;
    img {
      width: 100%;
    }
  }
  .preview2 {
    box-sizing: border-box;
    width: 100%;
    padding: 0.2rem;
  }
  .area {
    width: 7.5rem;
    padding: 0.2rem;
    box-sizing: border-box;
  }
}
</style>
