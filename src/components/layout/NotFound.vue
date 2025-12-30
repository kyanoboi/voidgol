<script setup lang="ts">
import { CircleX } from 'lucide-vue-next'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle, EmptyMedia } from '@/components/ui/empty'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia>
        <CircleX />
      </EmptyMedia>
      <EmptyTitle>404 - Not Found</EmptyTitle>
      <EmptyDescription> The page you're looking for doesn't exist. </EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
