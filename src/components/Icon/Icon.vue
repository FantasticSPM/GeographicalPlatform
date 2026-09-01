<template>
    <i class="icon" :style="{ width: size + 'px', height: size + 'px' }">
        <slot></slot>
    </i>
</template>

<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 24,
    },
    color: {
        type: String,
        default: '#0b7ae1',
    },
})
</script>

<style scoped>
.icon {
    display: block;
    flex: none;
}

.icon__shape {
    filter: drop-shadow(0 2px 2px rgba(23, 50, 77, 0.2));
}
</style>