<script lang="ts" setup>
import Sidebar from '@/components/layout/SideBar.vue'
</script>

<template>
  <nav>
    <Sidebar />
  </nav>
  <main class="h-screen w-screen">
    <RouterView />
  </main>
</template>

<style lang="less" scoped>
nav {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
