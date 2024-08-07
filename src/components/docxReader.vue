<template>
  <div v-html="content"></div>
  11111111
</template>

<script>
import * as mammoth from "mammoth";
import http from "../api/request.js";
export default {
  mounted() {
    http("http://cdn.xxoutman.cn/%E8%82%96%E6%94%80%E7%A6%BB%E8%81%8C%E7%94%B3%E8%AF%B7%E4%B9%A6-1698392976702.docx").then((res) => {
      console.log(res);
    });
  },
  data() {
    return {
      content: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        this.readFile(file);
      }
    },
    async readFile(file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const result = await this.extractDocxContent(arrayBuffer);

        this.content = result.value;
      };

      reader.readAsArrayBuffer(file);
    },
    extractDocxContent(arrayBuffer) {
      return new Promise((resolve, reject) => {
        mammoth
          .extractRawText({ arrayBuffer })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>

<style>
/* Add your styles here if needed */
</style>
