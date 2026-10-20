<script setup>defineProps({modelValue:String,genres:Array});defineEmits(['update:modelValue']);</script>
<template><div class="genre-filter" role="group" aria-label="Filter by genre"><button v-for="genre in genres" :key="genre" :class="{active:modelValue===genre}" :aria-pressed="modelValue===genre" @click="$emit('update:modelValue',genre)">{{genre}}</button></div></template>
