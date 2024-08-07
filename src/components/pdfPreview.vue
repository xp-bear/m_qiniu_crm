<template>
  <div class="pdf-preview">
    <div class="pdf-wrap">
      <vue-pdf-embed :source="state.source" class="vue-pdf-embed" :page="state.pageNum" :style="scale" />
    </div>
    <div class="page-tool">
      <div class="page-tool-item" @click="lastPage">上一页</div>
      <div class="page-tool-item" @click="nextPage">下一页</div>
      <div class="page-tool-item">{{ state.pageNum }}/{{ state.numPages }}</div>
      <div class="page-tool-item" @click="pageZoomOut">放大</div>
      <div class="page-tool-item" @click="pageZoomIn">缩小</div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted, computed } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm"; // 获得总页数

const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
});
const state = reactive({
  source: props.pdfUrl, // 预览pdf文件地址
  pageNum: 1, //当前页面
  scale: 1, // 缩放比例
  numPages: 0, // 总页数
});

const scale = computed(() => `transform:scale(${state.scale});width:7.3rem`);
function lastPage() {
  if (state.pageNum > 1) {
    state.pageNum -= 1;
  }
}
function nextPage() {
  if (state.pageNum < state.numPages) {
    state.pageNum += 1;
  }
}
function pageZoomOut() {
  console.log(state.scale);

  if (state.scale < 2) {
    state.scale += 0.1;
  }
}
function pageZoomIn() {
  if (state.scale > 1) {
    state.scale -= 0.1;
  }
}

// 钩子函数中使用createLoadingTask 获取下 预览文件的总页数
onMounted(() => {
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then((pdf) => {
    // console.log(pdf);
    state.numPages = pdf.numPages;
  });
});
</script>
<style lang="css" scoped>
.pdf-preview {
  position: relative;
  height: 81vh;
  /* padding: 20px 0; */
  box-sizing: border-box;
  background: rgb(66, 66, 66);
  font-size: 0.28rem;
}

.vue-pdf-embed {
  text-align: center;
  /* width: 515px; */
  border: 0.02rem solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}

.pdf-preview {
  position: relative;
  /* height: 100vh; */
  /* padding: 20px 0; */
  box-sizing: border-box;
  background-color: e9e9e9;
}

.pdf-wrap {
  overflow-y: hidden;
}

.vue-pdf-embed {
  text-align: center;
  /* width: 515px; */
  border: 0.02rem solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}

.page-tool {
  width: 90%;
  margin: 0 auto;
  position: absolute;
  bottom: 0.4rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  display: flex;
  align-items: center;
  background: rgb(66, 66, 66);
  color: white;
  border-radius: 0.38rem;
  z-index: 100;
  cursor: pointer;
  margin-left: 50%;
  transform: translateX(-50%);
}

.page-tool-item {
  padding: 0.16rem 0.3rem;
  padding-left: 0.2rem;
  cursor: pointer;
}
</style>
