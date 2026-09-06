<template>
  <section class="panel2" :style="{ width }" :aria-label="title || undefined">
    <div class="panel2__ambient-light" aria-hidden="true"></div>

    <header class="panel2__header">
      <div class="panel2__heading">
        <span v-if="eyebrow" class="panel2__eyebrow">{{ eyebrow }}</span>
        <div class="panel2__title-row">
          <span class="panel2__indicator" aria-hidden="true"></span>
          <slot name="title">
            <h2>{{ title }}</h2>
          </slot>
        </div>
        <p v-if="subtitle" class="panel2__subtitle">{{ subtitle }}</p>
      </div>

      <div class="panel2__actions">
        <slot name="actions"></slot>
        <button
          v-if="closable"
          class="panel2__close"
          type="button"
          aria-label="关闭面板"
          title="关闭面板"
          @click="emit('close')"
        >
          <el-icon><Close /></el-icon>
        </button>
      </div>
    </header>

    <div class="panel2__divider" aria-hidden="true">
      <span></span>
    </div>

    <div class="panel2__body">
      <slot></slot>
    </div>

    <footer v-if="$slots.footer" class="panel2__footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  eyebrow: {
    type: String,
    default: "GEOSPATIAL MONITOR",
  },
  subtitle: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "340px",
  },
  closable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.panel2 {
  --panel-bg: rgba(7, 19, 33, 0.94);
  --panel-bg-deep: #081525;
  --panel-line: rgba(107, 196, 238, 0.2);
  --panel-line-bright: rgba(115, 219, 255, 0.52);
  --panel-text: #e8f7ff;
  --panel-muted: #7f9bad;
  --panel-blue: #55cfff;
  position: relative;
  display: flex;
  min-height: 280px;
  max-height: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--panel-line);
  border-radius: 4px;
  color: var(--panel-text);
  background:
    linear-gradient(135deg, rgba(37, 116, 160, 0.12), transparent 38%),
    var(--panel-bg);
  box-shadow:
    0 16px 36px rgba(0, 0, 0, 0.38),
    0 0 0 1px rgba(24, 105, 145, 0.08) inset,
    0 0 28px rgba(38, 161, 211, 0.08);
  isolation: isolate;
  backdrop-filter: blur(14px);
}

.panel2::before,
.panel2::after {
  position: absolute;
  z-index: -1;
  content: "";
  pointer-events: none;
}

.panel2::before {
  inset: 0;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(133, 213, 245, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(133, 213, 245, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, #000, transparent 72%);
}

.panel2::after {
  top: 0;
  right: 0;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(55, 192, 240, 0.16),
    transparent 68%
  );
  transform: translate(34%, -42%);
}

.panel2__ambient-light {
  position: absolute;
  z-index: -1;
  bottom: -90px;
  left: -90px;
  width: 210px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(27, 113, 193, 0.15),
    transparent 68%
  );
  pointer-events: none;
}

.panel2__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 20px 16px;
}

.panel2__heading {
  min-width: 0;
}

.panel2__eyebrow {
  display: block;
  margin-bottom: 8px;
  overflow: hidden;
  color: var(--panel-blue);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.8px;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.panel2__title-row {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
}

.panel2__indicator {
  width: 3px;
  height: 24px;
  flex: none;
  border-radius: 999px;
  background: linear-gradient(180deg, #8ce9ff, #168ed0);
  box-shadow: 0 0 12px rgba(73, 208, 255, 0.8);
}

.panel2__title-row :deep(h2) {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--panel-text);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.panel2__subtitle {
  margin: 8px 0 0 13px;
  color: var(--panel-muted);
  font-size: 12px;
  line-height: 1.6;
}

.panel2__actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 8px;
}

.panel2__close {
  display: inline-flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 3px;
  color: #7493a5;
  background: transparent;
  cursor: pointer;
  transition:
    color 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease;
}

.panel2__close:hover {
  border-color: var(--panel-line-bright);
  color: var(--panel-blue);
  background: rgba(70, 185, 226, 0.1);
}

.panel2__close:focus-visible {
  outline: 2px solid rgba(85, 207, 255, 0.6);
  outline-offset: 2px;
}

.panel2__divider {
  height: 1px;
  margin: 0 20px;
  background: var(--panel-line);
}

.panel2__divider span {
  display: block;
  width: 68px;
  height: 1px;
  background: var(--panel-blue);
  box-shadow: 0 0 10px rgba(85, 207, 255, 0.75);
}

.panel2__body {
  min-height: 0;
  flex: 1;
  padding: 18px 20px 20px;
  overflow: auto;
}

.panel2__body::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.panel2__body::-webkit-scrollbar-track {
  background: transparent;
}

.panel2__body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(85, 207, 255, 0.42);
}

.panel2__body::-webkit-scrollbar-thumb:hover {
  background: rgba(85, 207, 255, 0.72);
}

.panel2__footer {
  padding: 14px 20px 18px;
  border-top: 1px solid var(--panel-line);
}

@media (max-width: 560px) {
  .panel2 {
    width: min(360px, calc(100vw - 32px)) !important;
  }

  .panel2__header {
    padding: 17px 16px 14px;
  }

  .panel2__divider {
    margin: 0 16px;
  }

  .panel2__body {
    padding: 16px;
  }

  .panel2__footer {
    padding: 12px 16px 16px;
  }
}
</style>
