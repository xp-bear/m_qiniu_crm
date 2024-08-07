<template>
  <div class="User">
    <div class="bgone">
      <div class="logo"><img :src="userObj.avatar" alt="" /></div>
      <div class="name">{{ userObj.username }}</div>
      <!-- 编辑信息 -->
      <div class="editinfo">
        <div><i class="iconfont icon-yanzhengyanzhengma"></i><span>高级认证</span></div>
        <div><i class="iconfont icon-mn_wendang"></i><span>编辑资料</span></div>
      </div>
      <!-- 面板信息展示 -->
      <div class="banner">
        <div class="ripple-example-block" v-ripple="{ color: '#ffffff' }"><span>588</span><span>文件总数</span></div>
        <div class="ripple-example-block" v-ripple="{ color: '#ffffff' }"><span>72</span><span>我的收藏</span></div>
        <div class="ripple-example-block" v-ripple="{ color: '#ffffff' }"><span>32</span><span>红包金额</span></div>
      </div>
    </div>
    <!-- 动作面板选项 -->
    <div class="action">
      <div class="actone ripple-example-block" v-ripple="{ color: '#2979ff' }">
        <div>
          <p style="vertical-align: bottom">
            <i class="iconfont icon-xiangji" style="margin-right: 0.23rem"></i>
            <span>优惠券</span>
          </p>
          <i class="iconfont icon-ln_qianjin_a back"></i>
        </div>
      </div>
      <div class="actone ripple-example-block" v-ripple="{ color: '#2979ff' }">
        <div>
          <p style="vertical-align: bottom">
            <i class="iconfont icon-mn_jifen" style="margin-right: 0.23rem"></i>
            <span>积分商城</span>
          </p>
          <i class="iconfont icon-ln_qianjin_a back"></i>
        </div>
      </div>
      <div class="actone ripple-example-block" v-ripple="{ color: '#2979ff' }">
        <div>
          <p style="vertical-align: bottom">
            <i class="iconfont icon-chuangzuozhezhongxin" style="margin-right: 0.23rem"></i>
            <span>我的钱包</span>
          </p>
          <i class="iconfont icon-ln_qianjin_a back"></i>
        </div>
      </div>
      <div class="actone ripple-example-block" v-ripple="{ color: '#2979ff' }">
        <div>
          <p style="vertical-align: bottom">
            <i class="iconfont icon-shebeileixing" style="margin-right: 0.23rem"></i>
            <span>意见反馈</span>
          </p>
          <i class="iconfont icon-ln_qianjin_a back"></i>
        </div>
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div class="logout" @click="logout">退出登录</div>

    <!-- 退出登录模态框 -->
    <var-dialog title="熊仔提示" message="退出登录之后，缓存文件会被清空" v-model:show="logOutFlag" @confirm="confirmlogOut" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex } = storeToRefs(store);

const userObj = ref({}); //用户信息对象
const logOutFlag = ref(false); //退出登录状态

// -----------------------------------------

// 退出登录
function logout() {
  logOutFlag.value = true;
}
// 确认退出登录
function confirmlogOut() {
  // 清空localstorage的文件
  localStorage.clear();
  router.push("/login");
  redirIndex.value = 0; //默认选中我的空间页面
}

onMounted(() => {
  // console.log($route.path);
  if ($route.path == "/user") {
    redirPath.value = "/user";
    redirIndex.value = 3;
  }

  userObj.value = JSON.parse(localStorage.getItem("userObj"));
});
</script>

<style lang="less" scoped>
.User {
  width: 7.5rem;
  background-color: #fcfefe;
  .bgone {
    width: 100%;
    height: 4.62rem;
    background: url("../assets/user/bg.svg") no-repeat;
    background-size: cover;
    border-top: 0.01rem solid transparent;
    box-sizing: border-box;
    .logo {
      width: 1.15rem;
      height: 1.15rem;
      margin: 0.38rem auto 0.1rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 0.02rem #ccc;
      }
    }
    .name {
      height: 0.48rem;
      font-size: 0.34rem;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 0.48rem;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      vertical-align: top;
      font-family: "苹方";
    }
    .editinfo {
      display: flex;
      justify-content: center;
      height: 0.42rem;
      margin-top: 0.3rem;
      margin-bottom: 0.54rem;
      div {
        width: 1.54rem;
        height: 0.42rem;
        // opacity: 0.3;
        border-radius: 0.44rem;
        background: rgba(255, 255, 255, 0.3);
        margin-right: 0.19rem;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 0.23rem;
          font-weight: 500;
          letter-spacing: 0px;
          line-height: 0.33rem;
          color: rgb(255, 255, 255);
        }
        i {
          color: #fff;
          font-size: 0.23rem;
          margin-right: 0.08rem;
          line-height: 0.33rem;
        }
      }
    }
    .banner {
      width: 6.73rem;
      height: 1.87rem;
      margin: 0 auto;
      border-radius: 0.23rem;
      background: rgba(255, 255, 255, 0.17);
      box-shadow: 0 0.03rem 0.71rem rgba(0, 0, 0, 0.09);
      backdrop-filter: blur(0.48rem);
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      div {
        width: 1.28rem;
        height: 1.27rem;
        padding: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-child(1) {
            font-size: 0.4615rem;
            font-weight: 700;
            line-height: 0.541rem;
            color: #fff;
            text-align: center;
          }
          &:nth-child(2) {
            font-size: 0.26rem;
            font-weight: 500;
            line-height: 0.3898rem;
            color: #fff;
          }
        }
      }
    }
  }
  .action {
    width: 6.73rem;
    height: 3.84rem;
    margin: 1rem auto;
    border-radius: 0.1923rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.1635rem 0.4904rem rgba(233, 239, 245, 1);
    box-sizing: border-box;
    .actone {
      // width: 5.57rem;
      width: 100%;
      height: 0.96rem;
      padding: 0 0.58rem;
      margin: 0 auto;
      background-color: #fff;
      border-bottom: 0.02rem solid rgba(240, 245, 247, 1);
      box-sizing: border-box;

      div {
        height: 0.96rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(54, 59, 71, 1);
        font-size: 0.2692rem;
        .back {
          color: rgba(209, 216, 224, 1);
        }
      }
    }
  }
  .logout {
    width: 6.73rem;
    height: 0.92rem;
    margin: 0 auto;
    border-radius: 1.1731rem;
    background: linear-gradient(168.4deg, rgba(122, 215, 255, 1) 0%, rgba(52, 123, 241, 1) 100%);
    box-shadow: 0 0.1635rem 0.4904rem rgba(233, 239, 245, 1);
    font-size: 0.2692rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    line-height: 0.92rem;
  }
}
</style>
