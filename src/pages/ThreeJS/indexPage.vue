<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ref, markRaw } from 'vue'
import CameraIndex from './components/Camera/CameraIndex.vue'
import GeometryIndex from './components/Geometry/GeometryIndex.vue'
import type { Component } from 'vue'
import type { CarouselApi } from '@/components/ui/carousel'

interface CarouselItem {
  id: number
  title: string
  content?: Component
}

const carouselItems = ref<CarouselItem[]>([
  {
    id: 1,
    title: 'Camera',
    content: markRaw(CameraIndex),
  },
  {
    id: 2,
    title: 'Geometry',
    content: markRaw(GeometryIndex),
  },
])

const currentIndex = ref(0)
const fullscreenItem = ref<CarouselItem | null>(null)
const carouselApi = ref<CarouselApi | null>(null)

const onInitApi = (api: CarouselApi) => {
  carouselApi.value = api
  updateCurrentIndex()
  api && api.on('select', updateCurrentIndex)
}

const updateCurrentIndex = () => {
  if (carouselApi.value) {
    currentIndex.value = carouselApi.value.selectedScrollSnap()
  }
}

const openFullscreen = (item: CarouselItem) => {
  if (item.content) {
    fullscreenItem.value = item
  }
}

const closeFullscreen = () => {
  fullscreenItem.value = null
}
</script>

<template>
  <Carousel
    class="w-full max-w-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    @init-api="onInitApi"
  >
    <CarouselContent>
      <CarouselItem v-for="(item, index) in carouselItems" :key="item.id">
        <Card
          class="cursor-pointer hover:shadow-lg transition-shadow"
          @click="openFullscreen(item)"
        >
          <span class="text-xl font-semibold">{{ item.title }}</span>
          <CardContent class="flex aspect-square items-center justify-center">
            <component :is="item.content" v-if="item.content && index === currentIndex" />
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>

  <!-- 全屏遮罩 -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="fullscreenItem"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        @click.self="closeFullscreen"
      >
        <div class="w-full h-full p-8 flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-3xl font-bold text-white">{{ fullscreenItem.title }}</h2>
            <button
              class="text-white hover:text-gray-300 text-2xl px-4 py-2"
              @click="closeFullscreen"
            >
              ✕
            </button>
          </div>
          <div class="flex-1 relative">
            <component :is="fullscreenItem.content" v-if="fullscreenItem.content" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <router-view />
</template>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
