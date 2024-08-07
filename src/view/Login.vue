<template>
  <div class="Login">
    <!-- 视频背景 -->
    <div class="mask">
      <!-- <video ref="myVideo" :autoplay="true" :muted="true" :loop="true">
        <source src="../assets/other/bg.mp4" type="video/mp4" />
      </video> -->
      <img src="../assets/other/bgg.gif" alt="" />
    </div>

    <div class="tu">
      <img class="animate__animated animate__pulse animate__infinite animate__slower" src="../assets/other/logo.png" alt="" />
      <div class="sp">留住身边的小美好</div>
    </div>

    <!-- 登录主体区域 -->
    <div ref="logEle" class="contant animate__animated" v-show="LGstate">
      <div class="phone">
        <span>邮箱地址</span>
        <div class="ipt" ref="emailEle"><i class="iconfont icon-shouji"></i> <input type="text" v-model="logValue.email" @focus="toEmailFocus" @blur="toEmailBlur" /></div>
      </div>
      <div class="phone">
        <span>密码</span>
        <div class="ipt" ref="passwordEle"><i class="iconfont icon-mima"></i> <input type="password" v-model="logValue.password" @focus="toPassFocus" @blur="toPassBlur" /></div>
      </div>
      <div style="color: rgba(255, 142, 50, 1); font-size: 0.24rem; margin-bottom: 0.36rem">忘记密码了?</div>
      <button class="ripple-example-block var-elevation--2 logBtn" v-ripple @click="Logining">登录</button>
      <div class="info">欢迎回来!还没有账号? <span @click="toRegister">即刻注册</span></div>
    </div>
    <!-- 注册主体区域 -->
    <div ref="regEle" class="regContant contant animate__animated" v-show="!LGstate">
      <div class="phone sendEmail">
        <span>邮箱地址</span>
        <div class="ipt"><i class="iconfont icon-shouji"></i> <input type="text" v-model="regValue.email" /></div>
        <button class="sendMsg" ref="verification" @click="verificationCode">发送验证码</button>
      </div>
      <div class="phone">
        <span>验证码</span>
        <div class="ipt"><i class="iconfont icon-yanzhengma"></i> <input type="text" v-model="regValue.inputCode" /></div>
      </div>
      <div class="phone">
        <span>用户名</span>
        <div class="ipt"><i class="iconfont icon-wode"></i> <input type="text" v-model="regValue.username" /></div>
      </div>
      <div class="phone">
        <span>密码</span>
        <div class="ipt"><i class="iconfont icon-mima"></i> <input type="password" v-model="regValue.password" /></div>
      </div>
      <div style="color: rgba(45, 45, 45, 1); font-size: 0.24rem; margin-bottom: 0.36rem">注册账号证明您同意我们的相关服务条款及细则</div>
      <button class="ripple-example-block var-elevation--2 regBtn" v-ripple @click="registering">注册</button>
      <div class="info">已有账号？ <span @click="toLogin">点击这里</span></div>
    </div>
  </div>
</template>

<script setup>
import { Snackbar } from "@varlet/ui";
import { ref, onMounted, reactive } from "vue";
import { createuserApi, sendmailApi, sameemailApi, userloginApi } from "../api/index";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
const router = useRouter();

import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { userObj } = storeToRefs(store); //在Pinia结构的值

let emailEle = ref(null); //border 下边框的div元素
let passwordEle = ref(null); //border 下边框的div元素
let logEle = ref(null); //登录表单的元素
let regEle = ref(null); //注册表单的元素
let verification = ref(null); //注册表单的元素
let myVideo = ref(null); //视频背景的video元素

let LGstate = ref(true); //登录与注册状态切换  true -登录  false - 注册

let regValue = reactive({
  email: "", //注册邮箱地址
  code: "", //邮箱验证码
  inputCode: "", //用户输入的验证码
  username: "", //用户名
  password: "", //密码
}); //注册表单

let logValue = reactive({
  email: "", //邮箱地址
  password: "", //密码
});

// ----------------------------------------

onMounted(() => {
  // 尝试播放视频
  // myVideo.value.play().catch((error) => {
  //   console.error("视频播放失败:", error);
  // });
});

// 登录按钮点击
function Logining() {
  // 表单非空校验判断
  if (!logValue.email || !logValue.password) {
    return Snackbar({
      content: "必填字段不可为空",
      duration: 1000,
      type: "error",
    });
  }
  let data = {
    email: logValue.email,
    password: logValue.password,
  };
  
  userloginApi(data).then((res) => {
    // console.log(res);
    if (res.code == 200) {
      // 本地保存登录状态
      localStorage.setItem("userObj", JSON.stringify(res.userObj));
      // 保存token信息
      localStorage.setItem("token", JSON.stringify(res.token));
      // Pinia保存登录信息
      userObj.value = res.userObj;
      // 路由跳转
      router.push("/home");
      return Snackbar({
        content: res.message,
        duration: 1000,
        type: "success",
      });
      
    } else {
      return Snackbar({
        content: res.message,
        duration: 1000,
        type: "error",
      });
    }
  });
}

// 注册重置表单函数
function resetForm() {
  regValue.email = "";
  regValue.code = "";
  regValue.inputCode = "";
  regValue.username = "";
  regValue.password = "";
}

// 注册按钮点击
function registering() {
  // 表单非空校验判断
  if (!regValue.email || !regValue.code || !regValue.inputCode || !regValue.username || !regValue.password) {
    return Snackbar({
      content: "表单校验失败",
      duration: 1000,
      type: "error",
    });
  }
  // 邮箱和验证码的判断
  if (regValue.code.toLowerCase() != regValue.inputCode.toLowerCase()) {
    return Snackbar({
      content: "邮箱验证码错误",
      duration: 1000,
      type: "error",
    });
  }

  let data = {
    user_name: regValue.username,
    user_password: regValue.password,
    user_email: regValue.email,
    user_sex: 0,
    user_sign: "该用户很懒，暂时没有签名。",
    user_avatar: "http://cdn.xxoutman.cn/default_avatar.png",
    user_createtime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  };
  console.log(data);

  // 这里就要发起注册的请求了
  createuserApi(data).then((res) => {
    resetForm(); //重置表单函数
    LGstate.value = true; //切换到登录
    return Snackbar({
      content: "注册成功",
      duration: 1000,
      type: "success",
    });
  });
}

// 注册验证码
function verificationCode() {
  // 判断当前邮箱有没有注册过
  sameemailApi({ email: regValue.email }).then((res) => {
    if (res.message[0].SameEmail != 0) {
      return Snackbar({
        content: "邮箱已经注册过",
        duration: 1000,
        type: "warning",
      });
    } else {
      let counter = 60;
      //处理发送的逻辑
      if (verification.value.innerHTML == "发送验证码") {
        // 1.判断邮箱地址是否正确
        if (regValue.email.length == 0) {
          return Snackbar({
            type: "error",
            content: "请先输入邮箱地址",
            duration: 1000,
          });
        } else {
          // 正则表达式模式
          let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          // 使用正则表达式测试邮箱地址
          if (!emailPattern.test(regValue.email)) {
            // 没有通过检验
            return Snackbar({
              type: "error",
              content: "邮箱地址格式不正确",
              duration: 1000,
            });
          } else {
            // 开始发送验证码
            sendmailApi({ user_email: regValue.email }).then((res) => {
              regValue.code = res.VerificationCode; //保存验证码
            });

            //通过检验;
            Snackbar({
              type: "success",
              content: "验证码已发送,请查收",
              duration: 2000,
            });
          }
        }
      }
      //   立即改变颜色
      verification.value.style = "background-color: #ccc;";
      verification.value.innerHTML = `已发送(${counter})`;
      verification.value.disabled = true;

      let timer = setInterval(() => {
        counter--;
        verification.value.style = "background-color: #ccc;";
        verification.value.innerHTML = `已发送(${counter})`;
        verification.value.disabled = true;

        if (counter == 0) {
          clearInterval(timer);
          verification.value.style = "background-color: #25ba1b;";
          verification.value.innerHTML = `发送验证码`;
          verification.value.disabled = false;
        }
      }, 1000);
    }
  });
}

// 跳转到登录表单
function toLogin() {
  LGstate.value = true;
  logEle.value.classList += " animate__bounceIn";
}

// 跳转注册表单
function toRegister() {
  LGstate.value = false;
  regEle.value.classList += " animate__bounceIn";
}

function toEmailFocus() {
  emailEle.value.style = "border-bottom: 0.02rem solid #ff8e32";
}
function toEmailBlur() {
  emailEle.value.style = "border-bottom: 0.02rem solid rgba(234, 233, 255, 1);";
}
function toPassFocus() {
  passwordEle.value.style = "border-bottom: 0.02rem solid #ff8e32";
}
function toPassBlur() {
  passwordEle.value.style = "border-bottom: 0.02rem solid rgba(234, 233, 255, 1);";
}
</script>

<style lang="less" scoped>
@keyframes HUE_SHIFT {
  0% {
    filter: hue-rotate(0);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
.bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  animation: HUE_SHIFT 5s infinite;
  background: linear-gradient(-30deg, rgb(99, 110, 255), rgb(155, 249, 255), rgb(165, 117, 255), rgb(184, 141, 255));
}

.ripple-example-block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  user-select: none;
  cursor: pointer;
  color: #888;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transition: background-color 0.25s;
}

.Login {
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 2;
  background-color: #fafafa;
  .mask {
    position: absolute;
    z-index: -999;
    margin: 0 auto; /* 水平居中，通过设置左右边距为auto实现 */
    width: 100%;
    height: 100vh;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }
  .tu {
    text-align: center;
    padding-top: 1rem;
    img {
      width: 80%;
    }
    .sp {
      letter-spacing: 0.4rem;
      padding-left: 0.3rem;
      font-size: 0.24rem;
      //   color: #fff;
      font-weight: 600;
    }
  }
  .contant {
    width: 6.2rem;
    height: 6.2rem;
    background: rgba(255, 255, 255, 1);
    border: 0.02rem solid rgba(234, 233, 255, 1);
    border-radius: 0.5rem;
    margin: 1rem auto 0;
    padding: 0.36rem 0.4rem;
    .phone {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.36rem;
      span {
        color: rgba(31, 31, 57, 1);
        // font-size: 0.24rem;
        font-family: "HarmonyOS Sans SC";
        font-weight: 600;
        margin-bottom: 0.4rem;
      }

      .ipt {
        display: flex;
        align-items: center;
        // width: 5.36rem;
        height: 0.48rem;
        border-bottom: 0.02rem solid rgba(234, 233, 255, 1);
        transition: all 0.3s;
        i {
          color: #ff8e32;
          opacity: 1;
          margin-right: 0.36rem;
          font-size: 0.32rem;
          font-weight: 600;
        }
        input {
          width: 100%;
          border: 0;
          outline: none;
        }
      }
    }
    .logBtn {
      width: 100%;
      height: 1rem;
      background-color: #ff8e32;
      border: 0;
      color: #fff;
      box-shadow: 0 0.04rem 0.08rem rgba(0, 0, 0, 0.25);
      border-radius: 0.3rem;
      margin-bottom: 0.5rem;
    }
    .info {
      text-align: center;
      font-size: 0.24rem;
      color: rgba(119, 119, 157, 1);
      span {
        color: rgba(255, 142, 50, 1);
        cursor: pointer;
      }
    }
  }
  .regContant {
    width: 6.2rem;
    margin: 0.5rem auto 0;
    height: 9.1rem;
    .phone {
      .ipt {
        transition: all 0.3s;
        i {
          color: #cccccc;
        }
      }
      .ipt:has(input:focus) {
        border-bottom: 0.02rem solid #25ba1b;
      }
    }
    .regBtn {
      width: 100%;
      height: 1rem;
      background-color: #25ba1b;
      border: 0;
      color: #fff;
      box-shadow: 0 0.04rem 0.08rem rgba(0, 0, 0, 0.25);
      border-radius: 0.3rem;
      margin-bottom: 0.5rem;
    }
    .info {
      span {
        color: #39c55b;
        text-decoration: underline;
      }
    }

    .sendEmail {
      position: relative;
      .sendMsg {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 0.24rem;
        padding: 0.1rem;
        background-color: #25ba1b;
        box-shadow: 0 0 0.1rem #ccc;
        border-radius: 0.1rem;
        border: 0;
      }
    }
  }
}
</style>
