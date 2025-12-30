<script lang="ts" setup>
import Sidebar from '@/components/layout/SideBar.vue'
import LoadingPage from '@/components/layout/LoadingPage.vue'
</script>

<template>
  <nav>
    <Sidebar />
  </nav>
  <main class="h-screen w-screen">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive>
          <Suspense>
            <!-- 主要内容 -->
            <component :is="Component"></component>

            <!-- 加载中状态 -->
            <template #fallback>
              <LoadingPage />
            </template>
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </main>
</template>

<style lang="less" scoped>
nav {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
