<template>
    <Icon :size="size" :color="color">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path class="polygon-icon__shape" d="M8 13L20 6L39 12L35 32L20 42L7 31L8 13Z" :fill="color"
                fill-opacity="0.2" :stroke="color" stroke-width="2" stroke-linejoin="round" />
            <path class="polygon-icon__edge" d="M8 13L20 6L39 12M7 31L20 42L35 32" :stroke="color" stroke-width="1"
                stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.65" />
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
