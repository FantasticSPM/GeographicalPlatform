<template>
  <div
    class="bubble"
    :class="{
      'flex-end': data.role === 'user',
    }"
  >
    <img :src="data.avatar" alt="" class="avatar" />
    <div class="content" v-html="data.mdContent"></div>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { computed } from "vue";
const md = new MarkdownIt({
  // highlight(code, lang) {
  //   if (lang && hljs.getLanguage(lang)) {
  //     return hljs.highlight(code, {
  //       language: lang,
  //     }).value;
  //   }
  //   return hljs.highlightAuto(code).value;
  // },
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

props.data.mdContent = computed(() => {
  return md.render(props.data.content);
});
</script>

<style scoped lang="scss">
.bubble {
  display: flex;
  gap: v-bind("props.data.avatarGap");

  .avatar {
    width: v-bind("props.data.avatarSize");
    height: v-bind("props.data.avatarSize");
  }
  .content {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    white-space: pre-wrap;
  }
}
.flex-end {
  flex-direction: row-reverse;
}
</style>
