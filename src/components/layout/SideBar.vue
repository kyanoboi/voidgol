<script setup lang="ts">
import { Home, GalleryVerticalEnd, ListTodo } from 'lucide-vue-next'
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import NavMain from './NavMain.vue'

const navMain = [
  {
    title: 'Home',
    path: '/',
    icon: Home,
  },
  {
    title: 'Examples',
    path: '',
    icon: ListTodo,
    items: [
      { title: 'Three.js', path: '/threejs' },
      { title: 'WebGL', path: '/webgl' },
      { title: 'ArcGIS', path: '/arcgis' },
    ],
  },
]
</script>

<template>
  <SidebarProvider :default-open="false">
    <SidebarTrigger />
    <Sidebar :side="'right'" :variant="'floating'" :collapsible="'offcanvas'">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-foreground text-sidebar-primary-foreground"
              >
                <GalleryVerticalEnd class="size-4 text-amber-600" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">voidgol</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavMain :items="navMain" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>
