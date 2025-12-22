<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu :viewport="true" orientation="vertical">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>ThreeJs Examples</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-4 w-[300px]">
            <li>
              <NavigationMenuLink as-child>
                <a href="#">
                  <div class="font-medium">Components</div>
                  <div class="text-muted-foreground">
                    Browse all components in the library.
                  </div>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#">
                  <div class="font-medium">Documentation</div>
                  <div class="text-muted-foreground">
                    Learn how to use the library.
                  </div>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#">
                  <div class="font-medium">Blog</div>
                  <div class="text-muted-foreground">
                    Read our latest blog posts.
                  </div>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
