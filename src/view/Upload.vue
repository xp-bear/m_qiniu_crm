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
        <div class="preview" v-show="uploadFileType == 0">
          <var-image-preview :images="images" v-model:show="show" />
          <img :src="imageData" alt="" @click="clickPre" />
        </div>
        <div class="preview" v-show="uploadFileType == 1">
          <video :src="imageData" autoplay></video>
        </div>
        <div class="preview" v-show="uploadFileType == 2">
          <img src="../assets/imgs/2.gif" alt="" />
          <audio :src="imageData" autoplay style="display: none"></audio>
        </div>
        <div class="preview" v-show="uploadFileType == 3">
          <img src="../assets/imgs/3.gif" alt="" />
        </div>
        <div class="preview" v-show="uploadFileType == 4">
          <img src="../assets/imgs/4.gif" alt="" />
        </div>
        <div class="preview" v-show="uploadFileType == 5">
          <img src="../assets/imgs/5.gif" alt="" />
        </div>
        <div class="preview" v-show="uploadFileType == 6">
          <img src="../assets/imgs/6.gif" alt="" />
        </div>
        <div class="preview" v-show="uploadFileType == 7">
          <img src="../assets/imgs/7.gif" alt="" />
        </div>
        <div class="preview" v-show="uploadFileType == 8">
          <img src="../assets/imgs/8.gif" alt="" />
        </div>
        <!-- 上传进度条 -->
        <var-progress color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)" :value="processValue" :track="true" label style="padding: 0 0.2rem" />
        <!-- 上传文件信息 -->
        <div class="area">
          <div class="uploadName"><span>文件名称: </span><input type="text" v-model="uploadName" @change="changeSuffix" /></div>
          <div class="uploadSpace">
            <span>存储空间: </span>
            <var-select v-model="selectValue" size="small">
              <var-option label="cookies" />
              <var-option label="mkdown-picture" />
            </var-select>
          </div>
          <div class="uploadTurn"><span>添加时间戳: </span> <var-switch v-model="addTimeNow" @change="changeTimeName" /></div>
          <div class="uploadText"><span>文件描述: </span> <textarea v-model="fileRemark" placeholder="输入备注..."></textarea></div>
        </div>

        <!-- 上传,重选 按钮选择 -->
        <div class="submit">
          <var-button type="danger" @click="reupload">重新上传</var-button>
          <var-button type="success" @click="toSendFile">确认上传</var-button>
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
import { CONFIG } from "../config/constant.js";
import { getQiNiuTokenApi, minsertfileApi } from "../api/index";
import * as qiniu from "qiniu-js";
import dayjs from "dayjs";

let imageData = ref(""); //图片链接
let fileInput = ref(null); //拍照上传文本的ref
let localFile = ref(null); //本地上传文本的ref
let addTimeNow = ref(true); //添加时间戳开关
let selectValue = ref("cookies"); //下拉框选择区域
let toggleState = ref(true); //选择文件和预览文件切换。
const loading = ref(true); //骨架屏加载数据。
const show = ref(false); //显示图片的遮罩层
const images = ref([]); //显示图片的链接。 可以多张

let uploadName = ref(""); //上传的文件名称
let uploadFileType = ref(""); //上传的文件类型
let uploadLink = ref(""); //上传的文件链接
let uploadFile = ref(""); //上传的文件对象信息

const processValue = ref(0); //上传进度

let fileRemark = ref(""); //上传的文件对象信息
let fileAddress = ref(""); //上传的文件地址信息
const userObj = ref({}); //用户信息对象
// ---------------------------------------------------

// 加载数据
setTimeout(() => {
  loading.value = false;
}, 300);

onMounted(() => {
  if ($route.path == "/upload") {
    redirPath.value = "/upload";
    redirIndex.value = 1;
  }
  userObj.value = JSON.parse(localStorage.getItem("userObj"));
  getCurrentCity();
});
// 利用百度地图API,获取用户定位
function getCurrentCity() {
  //根据用户IP 返回城市级别的定位结果
  let native = new BMap.LocalCity();
  native.get((res) => {
    // console.log(res);
    let gc = new BMap.Geocoder();
    let pointAdd = new BMap.Point(res.center.lng, res.center.lat);
    gc.getLocation(pointAdd, (rs) => {
      // console.log(rs);
      // 百度地图解析城市名
      fileAddress.value = rs.addressComponents.province + "、" + rs.addressComponents.city + "、" + rs.addressComponents.district;
      console.log(fileAddress.value);
    });
  });
}

// 确认上传文件
function toSendFile() {
  // 上传文件到七牛云
  getQiNiuTokenApi({ space: selectValue.value, name: uploadName.value }).then((res) => {
    let qiniu_token = res.uploadToken; //上传的token

    // 这里要进行文件的上传操作,加上一些配置选项
    const putExtra = {
      mimeType: null,
    };
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z2,
    };
    let observable = qiniu.upload(uploadFile.value, uploadName.value, qiniu_token, putExtra, config);
    let observer = {
      next(res) {
        // console.log(res.total.percent.toFixed(0));
        processValue.value = res.total.percent.toFixed(0);
      },
      error(err) {
        console.log(err);
      },
      complete(res) {
        let key = encodeURIComponent(res.key);
        let base_url;
        if (selectValue.value == "mkdown-picture") {
          base_url = "http://mk.xxoutman.cn/";
        } else if (selectValue.value == "cookies") {
          base_url = "http://cdn.xxoutman.cn/";
        }

        uploadLink.value = base_url + key + "?" + Date.now();
        console.log("上传成功: ", uploadLink.value);

        // 在数据库插入一条数据
        let datas = {
          file_createtime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"), //new Date(),
          file_type: uploadFileType.value, //上传文件类型
          file_name: uploadName.value.split(".").slice(0, -1).join("."), //文件名称
          file_suffix: "." + uploadName.value.split(".").pop(), // 文件后缀名
          file_link: uploadLink.value, //文件链接
          file_size: "" + uploadFile.value.size, //文件大小
          file_region: selectValue.value, //文件存储区域
          file_user_id: JSON.parse(localStorage.getItem("userObj")).id, //文件用户id
          file_user_name: userObj.value.username, //文件用户名,
          file_likes: 1, //点赞用户
          file_views: 1, //浏览量
          file_remark: fileRemark.value,
          file_address: fileAddress.value,
          file_public: 0, //文件是否公开
        };
        minsertfileApi(datas).then((res) => {
          // 清除本次上传记录
          reupload();
          return Snackbar({
            content: "文件上传成功!",
            duration: 1000,
            type: "success",
          });
        });
      },
    };

    observable.subscribe(observer); // 上传over
  });
}

// 改变后缀名称
function changeSuffix() {
  isSFXtoTYPE("." + uploadName.value.split(".")[1]); //根据后缀名获取文件类型。
}

// 给文件名添加时间戳
function changeTimeName(state) {
  if (state == true) {
    let arr = uploadName.value.split(".");
    let fsuffix = "." + arr.pop();
    let fname = arr.join(".");
    let time = Date.now(); //时间戳
    uploadName.value = fname + "-" + time + fsuffix; //文件名称。
  } else {
    //1.2.3-45454545545.jar
    let arr = uploadName.value.split(".");
    let fsuffix = "." + arr.pop();
    let fname = arr.join(".").slice(0, -14);
    uploadName.value = fname + fsuffix; //文件名称。
  }
}

// 根据文件后缀名判断文件类型
function isSFXtoTYPE(suffix) {
  CONFIG.FILE_TYPE.some((item, index) => {
    uploadFileType.value = index; //赋值
    if (item.includes(suffix.toLowerCase())) {
      return true;
    }
  });
}

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

  let suffix = "." + file.name.split(".").pop();
  console.log(suffix);
  isSFXtoTYPE(suffix); //根据后缀名获取文件类型。

  let arr = file.name.split(".");
  let fsuffix = "." + arr.pop();
  let fname = arr.join(".");
  let time = Date.now(); //时间戳

  uploadName.value = fname + "-" + time + fsuffix; //文件名称。

  if (file) {
    // file进行赋值
    uploadFile.value = file;

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
  isSFXtoTYPE(".png"); //拍照的后缀名。

  let fname = "拍照";
  let fsuffix = ".png";
  let time = Date.now(); //时间戳
  uploadName.value = fname + "-" + time + fsuffix; //文件名称。

  if (file) {
    // file进行赋值
    uploadFile.value = file;

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
  addTimeNow.value = true; //添加时间戳的开关

  resetData();
}
</script>

<style lang="less" scoped>
.Upload {
  width: 7.5rem;
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
    overflow: hidden;
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
