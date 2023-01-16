<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/Nav/Header.vue';

const header = ref();
</script>

<template>
  <Header ref="header" />
  <RouterView />
</template>

<style></style>
