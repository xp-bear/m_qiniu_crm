<template>
  <div class="Home">
    <var-skeleton avatar title :rows="1" :loading="loadingScreen">
      <!-- 顶部搜索栏 -->
      <div class="search">
        <div class="avatar">
          <img :src="userObj.avatar" alt="" />
        </div>
        <div class="ipt">
          <i class="iconfont icon-icon- sea" @click="handleEnterKey"></i>
          <input type="search" placeholder="搜索关键字..." v-model="searchKey" @keyup.enter="handleEnterKey" />
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
            <var-tab>安装包</var-tab>
            <var-tab>代码文本</var-tab>
            <var-tab>记事本</var-tab>
            <var-tab>office文件</var-tab>
            <var-tab>其他文件</var-tab>
          </var-tabs>
        </div>
      </var-sticky>
    </var-skeleton>

    <!-- 主体区域tabs切换具体项目 -->
    <div ref="homeContent" class="contenting">
      <var-tabs-items v-model:active="activeTab" @change="tabChange">
        <!-- 全部区域 tab -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="(item, index) in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <!-- 0  图片  -->
                  <div v-if="item.file_type == 0">
                    <img :src="item.file_link" alt="" />
                  </div>
                  <!--1 视频  -->
                  <div v-else-if="item.file_type == 1">
                    <!-- 移动端 视频加载第一帧 -->
                    <video playsinline preload="metadata">
                      <source :src="item.file_link + '#t=0.1'" type="video/mp4" style="object-position: top center; object-fit: cover" />
                      当前浏览器不支持 video直接播放
                    </video>
                  </div>
                  <!-- 2 音乐 -->
                  <div v-else-if="item.file_type == 2" class="extra">
                    <img src="../assets/types/2.png" alt="" />
                  </div>
                  <!-- 3 压缩包 -->
                  <div v-else-if="item.file_type == 3" class="extra">
                    <img src="../assets/types/3.png" alt="" />
                  </div>
                  <!-- 4-安装包 -->
                  <div v-else-if="item.file_type == 4" class="extra">
                    <img src="../assets/types/4.png" alt="" />
                  </div>
                  <!-- 5-代码文本 -->
                  <div v-else-if="item.file_type == 5" class="extra">
                    <img src="../assets/types/5.png" alt="" />
                  </div>
                  <!-- 6-记事本 -->
                  <div v-else-if="item.file_type == 6" class="extra">
                    <img src="../assets/types/6.png" alt="" />
                  </div>
                  <!-- 7-office -->
                  <div v-else-if="item.file_type == 7" class="extra">
                    <img src="../assets/types/7.png" alt="" />
                  </div>
                  <!-- 8-其他文件  class="extra-other" -->
                  <div v-else-if="item.file_type == 8" class="extra">
                    <img src="../assets/types/8.png" alt="" />
                  </div>
                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis :tooltip="false" style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <!-- 标签展示 -->
                  <div>
                    <span style="background-color: #eaffff; color: #23aaf2; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 0"> 图片 </span>
                    <span style="background-color: #fff1ee; color: #f26b3f; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 1">视频</span>
                    <span style="background-color: #e1ffff; color: #00ddb3; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 2">音乐</span>
                    <span style="background-color: #ffe5ff; color: #ec4f8c; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 3">压缩包</span>
                    <span style="background-color: #ffd0ff; color: #4608ad; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 4">安装包</span>
                    <span style="background-color: #e7ffd2; color: #6a9955; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 5">代码</span>
                    <span style="background-color: #f7d4d4; color: #d44444; padding: 0.05rem 0.1rem; border-radius: 0.1rem; font-size: 0.22rem" v-show="item.file_type == 6">记事本</span>
                    <span style="background-color: #ffffe9; color: #f4c806; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 7">OFFICE</span>
                    <span style="background-color: #dce0e5; color: #5f6368; padding: 0.05rem 0.1rem; border-radius: 0.1rem" v-show="item.file_type == 8">其他</span>
                  </div>
                  <div>
                    <i class="iconfont icon-yonghu"></i>
                    <span>
                      <var-ellipsis style="max-width: 1.8rem" :tooltip="false"> {{ item.file_user_name }}</var-ellipsis>
                    </span>
                  </div>
                </div>
              </var-skeleton>
            </div>
          </div>
          <div v-else style="height: 100vh">
            <var-result class="result" type="info" title="empty space" description="快去上传文件吧">
              <template #footer>
                <var-button color="var(--result-info-color)" text-color="#fff" @click="toUploadFile"> 上传文件 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 图片区域 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img :src="item.file_link" alt="" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #eaffff; color: #23aaf2; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 图片 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 视频区域 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <!-- 移动端 视频加载第一帧 -->
                    <video playsinline preload="metadata">
                      <source :src="item.file_link + '#t=0.1'" type="video/mp4" />
                      当前浏览器不支持 video直接播放
                    </video>
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #fff1ee; color: #f26b3f; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 视频 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 音乐区域 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img src="../assets/imgs/2.gif" alt="" class="extra" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #e1ffff; color: #00ddb3; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 音乐 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 压缩包区域 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img src="../assets/imgs/3.gif" alt="" class="extra" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #ffd0ff; color: #ec4f8c; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 压缩包 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 安装包 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img src="../assets/imgs/4.gif" alt="" class="extra" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #ffd0ff; color: #4608ad; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 安装包 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 代码文件 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img src="../assets/imgs/5.gif" alt="" class="extra" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #e7ffd2; color: #6a9955; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 代码 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 记事本区域 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img src="../assets/imgs/6.gif" alt="" class="extra" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #f7d4d4; color: #d44444; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 记事本 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- offce 区域 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img src="../assets/imgs/7.gif" alt="" class="extra" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #ffffe9; color: #f4c806; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> OFFICE </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
        <!-- 其他区域区域 -->
        <var-tab-item>
          <div class="container" v-if="cardDatas.length != 0">
            <div class="card" v-for="item in cardDatas" :key="item.file_id" @click="toDetail(item)">
              <var-skeleton card card-height="1.5rem" title :loading="loadingScreen">
                <div class="box">
                  <div>
                    <img src="../assets/imgs/8.gif" alt="" class="extra-other" />
                  </div>

                  <div class="msg">
                    <div>
                      <i class="iconfont icon-mn_shoucang_fill"></i>
                      <span>{{ item.file_likes }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-liulan-mian"></i>
                      <span>{{ item.file_views }}</span>
                    </div>
                  </div>
                </div>
                <div class="title">
                  <var-ellipsis style="max-width: 3.6rem" :line-clamp="2">{{ formatName(item.file_name) }}</var-ellipsis>
                </div>
                <div class="user">
                  <div>
                    <span style="background-color: #dce0e5; color: #5f6368; padding: 0.05rem 0.1rem; border-radius: 0.1rem"> 其他 </span>
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
          <div v-else style="height: 100vh">
            <var-result class="result" type="empty" title="no data" description="暂时没有该类型的文件!">
              <template #footer>
                <var-button color="var(--result-empty-color)" text-color="#fff" @click="tabChange(0)"> 看其他类型 </var-button>
              </template>
            </var-result>
          </div>
        </var-tab-item>
      </var-tabs-items>

      <!-- 加载更多按钮 -->
      <div class="load" v-if="cardDatas.length != 0">
        <!-- 加载按钮 -->
        <var-button v-if="loadBtnChang" @click="toLoadData" block type="info" size="small" :loading="loadBtnState" loading-type="wave" loading-size="mini">加载更多</var-button>
        <!-- 暂无更多数据 -->
        <var-button v-else block type="default" size="small" text disabled>已经到底了啦!</var-button>
      </div>
    </div>

    <!-- 回到顶部 -->
    <var-back-top :duration="300" right="28" bottom="60" />

    <!-- -----------------------------详细内容右侧弹出层------------------------------------ -->
    <var-popup position="right" v-model:show="popCenterState" style="width: 7.5rem; height: 100%" @touchstart="startSwipe" @touchmove="detectSwipe" @touchend="endSwipe" @close="closePopup">
      <var-app-bar :title="popCenterData.file_name" style="overflow: hidden; background-color: #1b6ef3">
        <template #left>
          <var-button color="transparent" text-color="#fff" round text @click="retHome">
            <var-icon name="chevron-left" :size="24" />
          </var-button>
        </template>
        <!-- 文件后缀名 -->
        <template #right>
          <div
            style="
              height: 0.5rem;
              line-height: 0.5rem;
              padding: 0.02rem 0.1rem;
              border-radius: 0.1rem;
              background-color: #00ddb3;
              display: flex;
              justify-content: center;
              align-items: center;
              vertical-align: bottom;
              font-size: 0.32rem;
              box-sizing: border-box;
              font-family: consolas;
              letter-spacing: 0.012rem;
            "
          >
            <span>{{ popCenterData.file_suffix }}</span>
          </div>
        </template>
      </var-app-bar>
      <!-- 弹窗主体区域,不同文件展示区域 -->
      <div class="popContent" style="padding: 0.1rem 0.1rem 0rem">
        <!-- 0- 图片展示区域 -->
        <div
          v-if="popCenterData.file_type == 0"
          style="
            height: 4rem;
            background: url('https://cdn.xxoutman.cn/%E9%A9%AC%E8%B5%9B%E5%85%8B-1678353275378.png?1678353275530') no-repeat;
            overflow: hidden;
            display: flex;
            justify-content: center;
          "
          @click="preview(popCenterData.file_link)"
          @touchstart="handleTouchStart"
        >
          <img :src="popCenterData.file_link" alt="" style="width: 100%; object-fit: contain" />
        </div>
        <!--1- 视频展示区域 -->
        <div
          v-else-if="popCenterData.file_type == 1"
          style="
            width: 7.3rem;
            margin: 0 auto;
            height: 4rem;
            background: url('https://cdn.xxoutman.cn/%E9%A9%AC%E8%B5%9B%E5%85%8B-1678353275378.png?1678353275530') no-repeat;
            overflow: hidden;
            display: flex;
            justify-content: center;
          "
          @touchstart="handleTouchStart"
        >
          <video style="width: 100%" :src="popCenterData.file_link" :autoplay="true" :controls="true"></video>
        </div>
        <!-- 2-音乐 -->
        <div
          v-else-if="popCenterData.file_type == 2"
          style="
            width: 7.3rem;
            margin: 0 auto;
            height: 4rem;
            background: url('https://cdn.xxoutman.cn/tuchuang_music-1675916098865.jpg?1675916099175') no-repeat;
            background-size: cover;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          @touchstart="handleTouchStart"
        >
          <audio style="width: 100%" :src="popCenterData.file_link" :autoplay="true" :controls="true"></audio>
        </div>
        <!-- 3- 压缩包 -->
        <div
          v-if="popCenterData.file_type == 3"
          style="
            height: 4rem;
            background: url('https://cdn.xxoutman.cn/%E9%A9%AC%E8%B5%9B%E5%85%8B-1678353275378.png?1678353275530') no-repeat;
            overflow: hidden;
            display: flex;
            justify-content: center;
          "
          @touchstart="handleTouchStart"
        >
          <img src="../assets/imgs/3.gif" alt="" style="width: 100%; object-fit: contain" />
        </div>
        <!-- 4-安装包 -->
        <div
          v-if="popCenterData.file_type == 4"
          style="
            height: 4rem;
            background: url('https://cdn.xxoutman.cn/%E9%A9%AC%E8%B5%9B%E5%85%8B-1678353275378.png?1678353275530') no-repeat;
            overflow: hidden;
            display: flex;
            justify-content: center;
          "
          @touchstart="handleTouchStart"
        >
          <img src="../assets/imgs/3.gif" alt="" style="width: 100%; object-fit: contain" />
        </div>

        <!-- 5- 代码文件 -->
        <div v-else-if="popCenterData.file_type == 5" @touchstart="handleTouchStart" style="height: 77vh; overflow-y: auto; font-size: 0.24rem">
          <pre><code class="language-js line-numbers">{{codeInfo}}</code></pre>
        </div>
        <!-- 6- 记事本 -->
        <div
          v-else-if="popCenterData.file_type == 6"
          v-html="txtInfo"
          @touchstart="handleTouchStart"
          style="white-space: pre-wrap; font-size: 0.24rem; height: 77vh; overflow-y: auto; box-shadow: 0 0 0.06rem #1b6ef3 inset; padding: 0.1rem"
        ></div>

        <!-- 7- office文件 -->
        <div v-else-if="popCenterData.file_type == 7" @touchstart="handleTouchStart">
          <!-- 1 pdf -->
          <div v-if="popCenterData.file_suffix == '.pdf'">
            <PDFView :pdfUrl="popCenterData.file_link"></PDFView>
          </div>
          <!-- 预览文件的地方（用于渲染） 2 docx 文件预览
            <div v-else-if="popCenterData.file_suffix == '.docx'" style="background-color: #808080; max-height: 11rem; overflow-y: scroll">
              
              <div ref="docxfile" style="transform: scale(0.5); transform-origin: top"></div>
            </div>
          -->
          <div v-else>
            <iframe :src="'http://www.pfile.com.cn/api/profile/onlinePreview?url=' + popCenterData.file_link" style="font-size: 0.24rem; height: 77vh; width: 100%"></iframe>
          </div>
        </div>
        <!-- 8- 其他文件 -->
        <div
          v-if="popCenterData.file_type == 8"
          style="
            height: 4rem;
            background: url('https://cdn.xxoutman.cn/%E9%A9%AC%E8%B5%9B%E5%85%8B-1678353275378.png?1678353275530') no-repeat;
            overflow: hidden;
            display: flex;
            justify-content: center;
          "
          @touchstart="handleTouchStart"
        >
          <img src="../assets/imgs/3.gif" alt="" style="width: 100%; object-fit: contain" />
        </div>

        <!-- -----------------------------------文件详细信息 显示主体区域--------------------------------------- -->
        <div style="height: 1rem">
          <!-- 点赞,浏览量,分享的区域 -->
          <div class=".tip" style="display: flex; justify-content: space-between; align-items: center; padding: 0.1rem 0.24rem; font-size: 0.24rem; color: #b6babe">
            <div style="display: flex; flex: 1; justify-content: space-between">
              <div style="display: flex; align-items: center">
                <span style="margin-right: 0.08rem">收藏量:</span>
                <i style="margin-right: 0.02rem; font-size: 0.32rem; color: #61666c" class="iconfont icon-mn_shoucang_fill"> </i>
                <span style="font-size: 0.26rem; color: #61666c">{{ popCenterData.file_likes }}</span>
              </div>
              <div style="display: flex; align-items: center; vertical-align: bottom">
                <span style="margin-right: 0.08rem">浏览量:</span>
                <i style="font-size: 0.4rem; color: #61666c; margin-right: 0.02rem" class="iconfont icon-in_zhengyan_fill"></i>
                <span style="font-size: 0.26rem; color: #61666c">{{ popCenterData.file_views }}</span>
              </div>
              <div></div>
            </div>
            <div style="font-size: 0.26rem; color: #61666c">
              <span style="padding-right: 0.1rem" size="18">是否公开资源</span>
              <var-switch v-model="isPublicFlag" @change="toChangePublic(isPublicFlag, popCenterData.file_id)" />
            </div>
          </div>
          <!-- 文件展示区域 -->
          <div class="f-display">
            <!-- 文件所属者 -->
            <var-cell border>
              <template #icon><i style="margin-right: 0.05rem; font-size: 0.32rem" class="iconfont icon-mn_wo"></i> </template>
              <template #default>
                <div style="display: flex; justify-content: space-between">
                  <span>文件所属者:</span>
                  <span style="width: 4.9rem; text-align: right; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
                    {{ popCenterData.file_user_name }}
                  </span>
                </div>
              </template>
            </var-cell>
            <var-cell border>
              <template #icon><i style="margin-right: 0.05rem; font-size: 0.32rem" class="iconfont icon-mn_wendang"></i> </template>
              <template #default>
                <div style="display: flex; justify-content: space-between">
                  <span>文件大小:</span>
                  <span style="width: 4.9rem; text-align: right; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
                    {{ formatBytes(popCenterData.file_size) }}
                  </span>
                </div>
              </template>
            </var-cell>
            <var-cell border>
              <template #icon><i style="margin-right: 0.05rem; font-size: 0.32rem" class="iconfont icon-yk_shijian"></i> </template>
              <template #default>
                <div style="display: flex; justify-content: space-between">
                  <span>创建时间:</span>
                  <span style="width: 4.9rem; text-align: right; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
                    {{ dayjs(popCenterData.file_createtime).format("YYYY-MM-DD HH:mm:ss") }}
                  </span>
                </div>
              </template>
            </var-cell>

            <var-cell border>
              <template #icon><i style="margin-right: 0.05rem; font-size: 0.32rem" class="iconfont icon-zy_dizhi"></i> </template>
              <template #default>
                <div style="display: flex; justify-content: space-between">
                  <span>地理位置:</span>
                  <span style="width: 4.9rem; text-align: right; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
                    {{ popCenterData.file_address }}
                  </span>
                </div>
              </template>
            </var-cell>
            <var-cell border>
              <template #icon><i style="margin-right: 0.05rem; font-size: 0.32rem" class="iconfont icon-mn_daohang"></i> </template>
              <template #default>
                <div style="display: flex; justify-content: space-between" @click="copyToClipboard(popCenterData.file_link)">
                  <span>文件链接:</span>
                  <span style="width: 4.9rem; text-align: right; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
                    {{ popCenterData.file_link }}
                  </span>
                </div>
              </template>
            </var-cell>

            <!-- 文件备注信息 -->
            <var-card outline elevation="0" :description="popCenterData.file_remark || '暂时没有备注信息...'" style="white-space: pre-wrap" />
          </div>
        </div>
      </div>
      <!-- 删除文件按钮 -->
      <div
        style="
          position: fixed;
          bottom: 0.5rem;
          right: 0.5rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #d44444;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.5);
        "
        @click="deleteFileFlag = true"
      >
        <i class="iconfont icon-im_shanchu" style="color: #fff; font-size: 0.4rem"></i>
      </div>
      <!-- 删除模态框 -->
      <var-dialog title="熊仔提示" message="是否删除的文件？" v-model:show="deleteFileFlag" @confirm="deleteFile(popCenterData)" />
    </var-popup>
  </div>
</template>

<script setup>
import axios from "axios";
import dayjs from "dayjs"; // ES 2015
import { Snackbar, Dialog } from "@varlet/ui";
import { CONFIG } from "../config/constant";
import { msearchfile, deletefileApi, deleteQiNiuFileApi, isPublicChangeApi, minsertviewApi } from "../api/index";
import { formatBytes } from "../utils/tool";
import { LoadingBar } from "@varlet/ui";
import { ref, onMounted, computed, onUnmounted, nextTick, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); //导入路由模块
let $route = useRoute();
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
let { redirPath, redirIndex, scrollPageY } = storeToRefs(store);
import { ImagePreview } from "@varlet/ui";

import PDFView from "../components/pdfPreview.vue";
// 引入axios用来发请求

// 引入docx-preview插件
import * as docx from "docx-preview";

import Prism from "prismjs";

onUpdated(() => {
  Prism.highlightAll(); //修改内容后重新渲染
});
onMounted(() => {
  Prism.highlightAll(); //切换菜单重新渲染
});

let docxfile = ref(null); //docx dom元素

const homeContent = ref(); //home dom元素

const loadingScreen = ref(true); //骨架屏的加载
const popCenterState = ref(false); //弹出层状态判断。
const popCenterData = ref({}); //弹出层一个对象数据
const activeTab = ref(0); //tab栏的切换
const searchKey = ref(""); //搜索栏的value值

const cardDatas = ref([]); //卡片列表数据
const pageIndex = ref(0); //请求页面的limit
const pageTotal = ref(10); //每一页的总共条数

let startX = ref(null); //手指左滑距离

const loadBtnState = ref(false); //加载更多按钮状态
const loadBtnChang = ref(true); //加载更多按钮与没有更多按钮状态切换

const toggleZan = ref(false); //点赞的状态图标 未点亮
const toggleZanclass = ref(""); //点赞的class
const toggleZancolor = ref(""); //点赞的颜色

const toggleLove = ref(false); //点赞的状态图标 未点亮
const toggleLoveclass = ref(""); //点赞的class
const toggleLovecolor = ref(""); //点赞的颜色

const txtInfo = ref(""); //显示文本为6的时候展示
const codeInfo = ref(""); //显示代码为5的时候展示

const isPublicFlag = ref(false); //是否公开资源
const deletePosition = ref("right-bottom"); //删除按钮
const deleteFileFlag = ref(false); //删除文件的模态框

const userObj = JSON.parse(localStorage.getItem("userObj"));

// ------------------------------------------------------------
// 页面数据加载
onMounted(() => {
  LoadingBar.start(); //开始加载条。

  if ($route.path == "/home") {
    redirPath.value = "/home";
    redirIndex.value = 0;
  }

  // 请求数据加载
  getData();
});

// 销毁页面时的钩子函数。
onUnmounted(() => {
  // window.removeEventListener("scroll", doScroll);
});

//切换文件上传状态
function toChangePublic(is_public, file_id) {
  // 请求数据库
  isPublicChangeApi({
    is_public: is_public ? 0 : 1,
    file_id,
  })
    .then((res) => {
      if (is_public == true) {
        cardDatas.value.filter((item) => {
          if (item.file_id == file_id) {
            return (item.file_public = 0);
          }
        });
        return Snackbar.warning({ content: "文件状态变更为私有", duration: 1000 });
      } else {
        cardDatas.value.filter((item) => {
          if (item.file_id == file_id) {
            return (item.file_public = 1);
          }
        });
        return Snackbar.success({ content: "文件共享成功", duration: 1000 });
      }
    })
    .catch((err) => {
      return Snackbar.danger({ content: "文件状态变更失败", duration: 1000 });
    });
}

// 首页上传文件
function toUploadFile() {
  // redirPath.value = "/upload";
  redirIndex.value = 1;
  router.push("/upload");
}

// 打开遮罩层
const toDetail = (item) => {
  popCenterState.value = true; //打开遮罩层

  // 处理文件名显示长度问题
  if (item.file_name.length > 33) {
    item.file_name = item.file_name.slice(0, 32) + "...";
  }
  // 增加浏览量接口
  minsertviewApi({ file_id: item.file_id }).then((res) => {
    // console.log(res);
    item.file_views += 1;
    // 卡片进行赋值
    popCenterData.value = item;
  });

  //挂载成功后给pop事件绑定一个方法 // 如果支持 popstate （一般移动端都支持）
  if (window.history && window.history.pushState) {
    // 往历史记录里面添加一条新的当前页面的url
    history.pushState(null, null, document.URL);
    // 给 popstate 绑定一个方法用来监听页面返回
    window.addEventListener("popstate", retHome, false); //false阻止默认事件
  }

  //  渲染数据 判断是否是 文件类型是否是 6 记事本
  if (item.file_type == 6) {
    openTxt(item.file_link);
  }
  if (item.file_type == 5) {
    openCode(item.file_link);
    setTimeout(() => {
      Prism.highlightAll(); //切换菜单重新渲染
    }, 300);
  }

  // // 加载docx
  if (item.file_suffix == ".docx") {
    axios({
      method: "get",
      responseType: "blob", // 因为是流文件，所以要指定blob类型
      url: item.file_link, // 自己的服务器，提供的一个word下载文件接口
    }).then(({ data }) => {
      console.log(data); // 后端返回的是流文件
      docx.renderAsync(data, docxfile.value); // 渲染到页面
    });
  }

  // 判断文件是否公开的判断
  item.file_public ? (isPublicFlag.value = true) : (isPublicFlag.value = false);
};
// 页面返回函数
const retHome = () => {
  // 关闭弹出层的状态
  popCenterState.value = false;

  // 清除弹出层的数据
  // popCenterData.value = {};

  //组件销毁后清除事件
  window.removeEventListener("popstate", retHome, false); //false阻止默认事件
};

// 关闭弹出层
function closePopup() {
  popCenterData.value = {}; //清空值
}

// 删除文件
function deleteFile(popCenterData) {
  // console.log(popCenterData);
  let data = {
    file_name: popCenterData.file_name + popCenterData.file_suffix,
    space: popCenterData.file_region,
  };

  deleteQiNiuFileApi(data).then((res) => {
    if (res.code == 200) {
      deletefileApi({ file_id: popCenterData.file_id }).then((result) => {
        cardDatas.value = cardDatas.value.filter((item) => item.file_id !== popCenterData.file_id);
        popCenterState.value = false;
        Snackbar.success({ content: "删除成功!", duration: 1000 });
      });
    } else {
      Snackbar.error({ content: "删除失败!", duration: 1000 });
    }
  });
}

// 格式化名称
function formatName(name) {
  if (name.includes("-")) {
    name = name.slice(0, -14);
  }
  return name;
}

function handleTouchStart(event) {
  // 阻止事件穿透
  event.stopPropagation();
}

// 复制文字到粘贴板
function copyToClipboard(value) {
  console.log(value);
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

// 加载更多数据
const toLoadData = async () => {
  loadBtnState.value = true;

  // 请求下一页数据
  pageIndex.value += pageTotal.value;
  await getData();

  loadBtnState.value = false;
};

// 监听回车健
function handleEnterKey() {
  loadBtnChang.value = true;
  pageIndex.value = 0;
  let data = {
    pageIndex: pageIndex.value, //页面索引
    pageTotal: pageTotal.value, //页面总条数
    file_name: searchKey.value, //搜索关键字
    file_remark: searchKey.value, //搜索文件备注
    file_type: activeTab.value - 1, //文件类型
    file_id: JSON.parse(localStorage.getItem("userObj")).id,
  };
  msearchfile(data).then((res) => {
    console.log(res);
    cardDatas.value = [...res.msg];
  });
}

// 请求数据加载
function getData() {
  Snackbar.loading("数据正在加载中...");

  let data = {
    pageIndex: pageIndex.value, //页面索引
    pageTotal: pageTotal.value, //页面总条数
    file_name: searchKey.value, //搜索关键字
    file_remark: searchKey.value, //搜索文件备注
    file_type: activeTab.value - 1, //文件类型
    file_id: JSON.parse(localStorage.getItem("userObj")).id,
  };
  // console.log(data);

  msearchfile(data)
    .then((res) => {
      // console.log(res);
      if (res.msg.length == 0) {
        // 判断是第一次用户登录进来
        if (JSON.parse(localStorage.getItem("userObj")).id) {
          LoadingBar.finish(); //结束加载条。
          loadingScreen.value = false; //结束骨架屏
        }
        loadBtnChang.value = false; //切换为没有更多了
        return Snackbar.warning({ content: "暂无更多数据！", duration: 1000 });
      }
      cardDatas.value = [...cardDatas.value, ...res.msg];

      // setTimeout(() => {}, 300);
      Snackbar.success({ content: "加载成功！", duration: 1000 });
      LoadingBar.finish(); //结束加载条。
      loadingScreen.value = false; //结束骨架屏
    })
    .catch((err) => {
      Snackbar.error({ content: "数据加载失败!", duration: 3000 });
      LoadingBar.finish(); //结束加载条。
      return;
    });
}

function openTxt(file_url) {
  axios
    .get(file_url)
    .then((response) => {
      // 成功加载文件内容
      // this.fileContent = response.data;
      console.log(response.data);
      txtInfo.value = response.data; //赋初值
    })
    .catch((error) => {
      // 处理加载文件失败的情况
      console.error("Error loading file:", error);
    });
}
function openCode(file_url) {
  axios
    .get(file_url)
    .then((response) => {
      // 成功加载文件内容
      // this.fileContent = response.data;
      // console.log(response.data);
      codeInfo.value = response.data; //赋初值
    })
    .catch((error) => {
      // 处理加载文件失败的情况
      console.error("Error loading file:", error);
    });
}

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

// tab栏切换,索引也切换
function tabChange(active) {
  activeTab.value = active;
  console.log("tab栏切换索引:", activeTab.value - 1);

  loadBtnChang.value = true; //切换为加载更多

  // 滚动页面到顶部
  window.scrollTo({
    top: 0,
    behavior: "auto", // 可以使用 'auto' 或 'smooth' 来控制滚动的平滑度
  });
  pageIndex.value = 0;
  let data = {
    pageIndex: pageIndex.value, //页面索引
    pageTotal: pageTotal.value, //页面总条数
    file_name: searchKey.value, //搜索关键字
    file_remark: searchKey.value, //搜索文件备注
    file_type: activeTab.value - 1, //文件类型
    file_id: JSON.parse(localStorage.getItem("userObj")).id,
  };
  msearchfile(data).then((res) => {
    console.log(res);
    cardDatas.value = res.msg;
  });
}

// 弹出层显示大图
function preview(imgLink) {
  ImagePreview(imgLink);
}
</script>

<style lang="less" scoped>
.Home {
  position: relative;
  width: 7.5rem;
  box-sizing: border-box;
  :deep(.var-skeleton__card) {
    margin-bottom: 0;
  }

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
    min-height: 82vh;
    background-color: #f1f2f4;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 0.1rem 0.1rem 1rem;
    .card {
      width: 3.6rem;
      height: 3.2rem;
      border-radius: 0.1rem;
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
          object-position: center;
          vertical-align: middle;
        }
        .extra {
          width: 50%;
          margin: 0 auto;
          object-fit: contain;
          object-position: center;
          display: flex;
          align-items: center;
        }
        .extra-other {
          display: flex;
          box-sizing: border-box;
          width: 50%;
          margin: 0 auto;
          overflow: hidden;
          img {
            margin-top: 0.4rem;
          }
        }
        video {
          width: 100%;
          height: 1.94rem;
          object-fit: cover;
          object-position: top center;
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
        display: flex;
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
  .contenting {
    display: flex;
    justify-content: center;
    position: relative;
    padding-bottom: 0.6rem;
    .load {
      position: absolute;
      width: 98%;
      bottom: 1rem;
      margin-bottom: 0.1rem;
    }
  }
}
</style>
