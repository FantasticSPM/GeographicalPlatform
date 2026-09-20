<template>
  <div
    class="bubble"
    :class="{
      'flex-end': data.role === 'user',
    }"
  >
    <img :src="data.avatar" alt="" class="avatar" />
    <div class="content-body">
      <div class="content" v-html="data.mdContent"></div>
      <div class="action">
        <el-button title="复制" text circle plain @click="copy(data.content)">
          <el-icon><CopyDocument /></el-icon>
        </el-button>
        <el-button title="修改" text circle>
          <el-icon><EditPen /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { computed } from "vue";
import { writeClipboard } from "@/utils/common";
import { ElMessage } from "element-plus";
const md = new MarkdownIt({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, {
        language: lang,
      }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

props.data.mdContent = computed(() => {
  return md.render(props.data.content).trimEnd();
});

async function copy(content) {
  await writeClipboard(content);
  ElMessage.success("复制成功");
}
</script>

<style scoped lang="scss">
.bubble {
  cursor: pointer;
  display: flex;
  gap: v-bind("props.data.avatarGap");
  &:hover .action {
    opacity: 1;
  }

  .avatar {
    width: v-bind("props.data.avatarSize");
    height: v-bind("props.data.avatarSize");
  }
  .content-body {
    position: relative;
  }
  .content {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    white-space: pre-wrap;
  }
}
.action {
  width: 100%;
  opacity: 0;
  transition: all 0.3s;
  display: flex;
  justify-content: flex-end;
  .el-button + .el-button {
    margin: 0;
  }
}
.flex-end {
  flex-direction: row-reverse;
}
</style>
