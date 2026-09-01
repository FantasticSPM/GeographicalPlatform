<template>
    <div class="panel">
        <div class="panel-heading">
            <slot name="header">
                {{ title }}
            </slot>
        </div>

        <div class="panel-divider"></div>

        <div class="panel-body">
            <slot></slot>
        </div>

        <div class="panel-footer">
            <slot name="footer"></slot>
        </div>

    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.panel {
    --blue: #0b7ae1;
    --ink: #17324d;
    --muted: #7b8c9d;
    display: flex;
    width: 300px;
    height: 100%;
    min-height: 420px;
    flex-direction: column;
    padding: 22px 20px 18px;
    overflow: hidden;
    pointer-events: auto;
    border: 1px solid rgba(210, 224, 235, 0.9);
    border-radius: 8px;
    color: var(--ink);
    background-color: #fff;
    box-shadow: 0 12px 30px rgba(24, 59, 91, 0.16), 0 2px 8px rgba(24, 59, 91, 0.08);
}

.panel-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.panel-divider {
    width: 100%;
    height: 1px;
    margin: 19px 0 21px;
    background-color: #e7eef4;
}

.panel-footer {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: auto;
    padding-top: 20px;
}

@media (max-width: 560px) {
    .panel {
        width: min(300px, calc(100vw - 32px));
        min-height: 390px;
        padding: 18px 16px 15px;
    }
}
</style>