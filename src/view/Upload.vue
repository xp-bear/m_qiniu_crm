<template>
  <div class="Upload">
    <!-- 顶部导航栏 -->
    <var-skeleton rows="1" :loading="loading">
      <div class="nav">文件上传</div>
    </var-skeleton>
    <!-- 标题展示 -->
    <var-skeleton card card-height="1.6rem" rows="0" :loading="loading">
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
    </var-skeleton>
    <!-- 选择上传方式 -->
    <var-skeleton title rows="0" :loading="loading"> </var-skeleton>
    <var-skeleton card card-height="1.6rem" rows="0" :loading="loading">
      <div v-if="toggleState">
        <div class="uploadTitle">选择上传方式</div>
        <div class="seleet">
          <input type="file" accept="image/*" capture="environment" ref="fileInput" style="display: none" @change="handleFileInputChange" />
          <div class="region" @click="openCamera">
            <i class="iconfont icon-xiangji"></i>
            <span>拍照</span>
          </div>
          <input type="file" ref="localFile" style="display: none" @change="LocalUploadChange" />
          <div class="region" @click="LocalUpload">
            <i class="iconfont icon-shangchuan1"></i>
            <span>选择文件</span>
          </div>
        </div>
      </div>

      <!-- 文件预览 -->
      <div v-else>
        <div class="uploadTitle">文件预览</div>
        <div class="preview">
          <var-image-preview :images="images" v-model:show="show" />
          <img :src="imageData" alt="" @click="clickPre" />
        </div>
        <!-- 上传文件信息 -->
        <div class="area">
          <div class="uploadName"><span>文件名称: </span><input type="text" /></div>
          <div class="uploadSpace">
            <span>存储空间: </span>
            <var-select v-model="selectValue" size="small">
              <var-option label="吃饭" />
              <var-option label="睡觉" />
            </var-select>
          </div>
          <div class="uploadTurn"><span>添加时间戳: </span> <var-switch v-model="addTimeNow" /></div>
          <div class="uploadText"><span>文件描述: </span> <textarea></textarea></div>
        </div>

        <!-- 上传,重选 按钮选择 -->
        <div class="submit">
          <var-button type="danger" @click="reupload">重新上传</var-button>
          <var-button type="success">确认上传</var-button>
        </div>
      </div>
    </var-skeleton>
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

let imageData = ref(""); //图片链接
let fileInput = ref(null); //拍照上传文本的ref
let localFile = ref(null); //本地上传文本的ref
let addTimeNow = ref(true); //添加时间戳开关
let selectValue = ref("吃饭"); //下拉框选择区域
let toggleState = ref(true); //选择文件和预览文件切换。
const loading = ref(true); //骨架屏加载数据。
const show = ref(false); //显示图片的遮罩层
const images = ref([]); //显示图片的链接。 可以多张

// 加载数据
setTimeout(() => {
  loading.value = false;
}, 300);
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

// 本地上传
function LocalUpload() {
  localFile.value.click(); // 触发文件选择对话框
}
// 本地上传输入框
function LocalUploadChange(event) {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    // 如果有这一个文件就预览图片。
    toggleState.value = false;

    const reader = new FileReader();

    reader.onload = (e) => {
      imageData.value = e.target.result;
      images.value.push(imageData.value);
    };

    reader.readAsDataURL(file);
  }
}

// 拍照上传
function openCamera() {
  fileInput.value.click(); // 触发文件选择对话框
}
function handleFileInputChange(event) {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    // 如果有这一个文件就预览图片。
    toggleState.value = false;

    const reader = new FileReader();

    reader.onload = (e) => {
      imageData.value = e.target.result;
      images.value.push(imageData.value);
    };

    reader.readAsDataURL(file);
  }
}

// 重置数据
function resetData() {
  imageData.value = "";
  images.value = [];
}

// 重新上传
function reupload() {
  toggleState.value = true;

  resetData();
}
</script>

<style lang="less" scoped>
.Upload {
  :deep(.var-select) {
    width: 4rem;
  }

  :deep(.var-field-decorator__placeholder) {
    font-size: 0.28rem !important;
  }
  :deep(.var-select__select span) {
    font-size: 0.28rem !important;
  }
  :deep(.var-option__text) {
    font-size: 0.28rem !important;
  }
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
    display: flex;
    justify-content: center;
    img {
      // width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .area {
    width: 7.5rem;
    box-sizing: border-box;
    padding: 0.2rem;
    .uploadName {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      span {
        font-size: 0.28rem;
      }
      input {
        flex: 1;
        height: 0.5rem;
        box-sizing: border-box;
        background-color: #eeeeee;
        outline: none;
        border: 0;
        padding: 0 0.1rem;
      }
    }
    .uploadTurn {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      margin-bottom: 0.2rem;
      span {
        font-size: 0.28rem;
      }
    }
    .uploadSpace {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      margin-bottom: 0.3rem;
      height: 0.6rem;
      span {
        font-size: 0.28rem;
        margin-top: 0.25rem;
      }
    }
    .uploadText {
      display: flex;
      box-sizing: border-box;
      // margin-bottom: 0.3rem;
      span {
        font-size: 0.28rem;
      }
      textarea {
        flex: 1;
        height: 1rem;
        box-sizing: border-box;
        background-color: #eeeeee;
        outline: none;
        border: 0;
        padding: 0.05rem 0.1rem;
        font-size: 0.28rem;
        resize: none;
      }
    }
  }
  .submit {
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    .var-button {
      width: 49%;
    }
  }
}
</style>
