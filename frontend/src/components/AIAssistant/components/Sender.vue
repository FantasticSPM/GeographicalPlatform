<template>
  <div class="sender">
    <el-input
      v-model="textarea"
      :rows="2"
      :autosize="autoSize"
      :placeholder="placeholder"
      class="el-textarea"
      type="textarea"
      resize="none"
      @keydown.enter="handleSubmit"
    />
    <div class="sender-updown">
      <div v-if="$slots.prefix" class="sender-updown-prefix">
        <slot name="prefix">
          <span></span>
        </slot>
      </div>

      <div class="sender-updown-action">
        <el-button
          :disabled="!textarea"
          circle
          v-if="clearable"
          @click="textarea = ''"
        >
          <el-icon>
            <Clear></Clear>
          </el-icon>
        </el-button>
        <el-button
          :disabled="!textarea"
          circle
          type="primary"
          @click="handleSubmit"
          ><el-icon><Top /></el-icon
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Clear from "@/components/Icon/Clear.vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "请输入您的问题",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => {
      return ["default", "primary"].includes(value);
    },
  },
  autoSize: {
    type: [Boolean, Object],
    default: true,
  },
});
const emits = defineEmits(["submit"]);
const textarea = defineModel("modelValue");

function handleSubmit() {
  emits("submit", textarea.value);
}
</script>

<style scoped lang="scss">
.sender {
  border-radius: 8px;
  flex-direction: column;
  display: flex;
  position: relative;
  overflow: hidden;
  cursor: text;
  line-height: 24px;
  width: 100%;
  font-size: 16px;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 4px 12px 4px 6px;

  .el-textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 24px;
    font-weight: bold;
    color: #000;
    background-color: #fff;
    box-sizing: border-box;
    :deep(textarea) {
      box-shadow: none;
    }
  }

  .sender-updown {
    display: flex;
    align-items: center;
    .sender-updown-prefix {
      padding-left: 10px;
    }
    .sender-updown-action {
      margin-left: auto;
    }
    // justify-content: space-between;
  }
}
</style>
