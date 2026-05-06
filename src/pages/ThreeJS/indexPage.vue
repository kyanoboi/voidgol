<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ref } from 'vue'
import CameraIndex from './components/Camera/CameraIndex.vue'

const carouselItems = ref([
  {
    id: 1,
    title: 'Camera',
    content: CameraIndex,
  },
  {
    id: 2,
    title: 'Item 2',
  },
  {
    id: 3,
    title: 'Item 3',
  },
  {
    id: 4,
    title: 'Item 4',
  },
  {
    id: 5,
    title: 'Item 5',
  },
])
</script>

<template>
  <Carousel class="w-full max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <CarouselContent>
      <CarouselItem v-for="item in carouselItems" :key="item.id">
        <Card>
          <span class="text-4xl font-semibold">{{ item.title }}</span>
          <CardContent class="flex aspect-square items-center justify-center">
            <component :is="item.content" v-if="item.content" />
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  <router-view />
</template>

<style lang="less" scoped></style>
