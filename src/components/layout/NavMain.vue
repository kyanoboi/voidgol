<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { ChevronRight } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useRouter } from 'vue-router'

defineProps<{
  items: {
    title: string
    path: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      path: string
    }[]
  }[]
}>()

const router = useRouter()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton
              :tooltip="item.title"
              v-on:click="() => Boolean(item.path) && router.push(item.path)"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight
                v-show="item.items"
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="item.items">
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child>
                  <a v-on:click="() => router.push(subItem.path)">
                    <span>{{ subItem.title }}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
