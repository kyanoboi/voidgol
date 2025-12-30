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

const carouselItems = ref([
  {
    id: 1,
    title: 'Camera',
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
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-4xl font-semibold">{{ item.title }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<style lang="less" scoped></style>
