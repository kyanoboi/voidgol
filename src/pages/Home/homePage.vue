<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import NavigationComp from './navigationComp.vue'

const containerRef = ref(null)

let camera, scene, renderer, material
let mouseX = 0, mouseY = 0
let width = 0, height = 0
let animationId

onMounted(() => {
  init()
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  window.removeEventListener('resize', onResize)
})

function init () {
  const container = containerRef.value
  width = container.clientWidth
  height = container.clientHeight

  camera = new THREE.PerspectiveCamera(55, width / height, 2, 2000)
  camera.position.z = 1000

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.001)

  const geometry = new THREE.BufferGeometry()
  const vertices = []

  for (let i = 0; i < 10000; i++) {
    vertices.push(
      2000 * Math.random() - 1000,
      2000 * Math.random() - 1000,
      2000 * Math.random() - 1000
    )
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  const sprite = new THREE.TextureLoader().load('textures/sprites/earth.png')
  sprite.colorSpace = THREE.SRGBColorSpace

  material = new THREE.PointsMaterial({
    size: 40,
    map: sprite,
    transparent: true,
    alphaTest: 0.5,
    sizeAttenuation: true
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.appendChild(renderer.domElement)

  container.addEventListener('pointermove', onPointerMove)
  window.addEventListener('resize', onResize)
}

function onResize () {
  const container = containerRef.value
  width = container.clientWidth
  height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function onPointerMove (e) {
  mouseX = e.offsetX - width / 2
  mouseY = e.offsetY - height / 2
}

function animate () {
  animationId = requestAnimationFrame(animate)
  render()
}

function render () {
  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.lookAt(scene.position)

  const h = ((Date.now() * 0.00005) % 1)
  material.color.setHSL(h, 0.5, 0.5)

  renderer.render(scene, camera)
}
</script>

<template>
  <div ref="containerRef" class="h-screen w-screen"></div>
  <div class="title">
    <div class="text-magic" data-word="voidgol" />
  </div>
  <div class="navigation">
    <NavigationComp />
  </div>
</template>

<style lang="less" scoped>
.navigation {
  position: absolute;
  top: 20px;
  right: 20px;
}

.title {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  pointer-events: none;
}

.text-magic {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(3);
  width: 300px;
  font-size: 24px;
  font-family: Raleway, Verdana, Arial;
  color: transparent;
}

.text-magic::before {
  content: attr(data-word);
  position: absolute;
  top: 0;
  left: 0;
  height: 36px;
  color: red;
  overflow: hidden;
  z-index: 2;
  filter: contrast(200%);
  text-shadow: 1px 0 0 red;
  animation: move 0.95s infinite;
}

.text-magic::after {
  content: attr(data-word);
  position: absolute;
  top: 0;
  left: -1px;
  height: 36px;
  color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  z-index: 3;
  color: cyan;
  filter: contrast(200%);
  text-shadow: -1px 0 0 cyan;
  mix-blend-mode: lighten;
  animation: move 1.1s infinite 0.2s;
}


@keyframes move {
  10% {
    top: -0.4px;
    left: -1.1px;
  }

  20% {
    top: 0.4px;
    left: -0.2px;
  }

  30% {
    left: .5px;
  }

  40% {
    top: -0.3px;
    left: -0.7px;
  }

  50% {
    left: 0.2px;
  }

  60% {
    top: 1.8px;
    left: -1.2px;
  }

  70% {
    top: -1px;
    left: 0.1px;
  }

  80% {
    top: -0.4px;
    left: -0.9px;
  }

  90% {
    left: 1.2px;
  }

  100% {
    left: -1.2px;
  }
}
</style>
