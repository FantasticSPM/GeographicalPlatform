<template>
    <Icon :size="size" :color="color">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path class="line-icon__shadow" d="M6 35L16 21L25 28L41 10" stroke="white" stroke-width="6"
                stroke-linecap="round" stroke-linejoin="round" />
            <path class="line-icon__path" d="M6 35L16 21L25 28L41 10" :stroke="color" stroke-width="3"
                stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="6" cy="35" r="2.5" :fill="color" />
            <circle cx="41" cy="10" r="2.5" :fill="color" />
        </svg>
    </Icon>
</template>

<script setup>
import Icon from './Icon.vue'
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
.line-icon {
    display: block;
    flex: none;
}

.line-icon__shadow {
    filter: drop-shadow(0 2px 2px rgba(23, 50, 77, 0.16));
}
</style>
