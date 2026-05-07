<template>
  <div ref="containerRef" class="geometry-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js'
import { plane, klein, mobius } from 'three/addons/geometries/ParametricFunctions.js'

const containerRef = ref<HTMLDivElement | null>(null)

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let stats: Stats

const init = () => {
  if (!containerRef.value) return

  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000)
  camera.position.y = 500

  scene = new THREE.Scene()

  const ambientLight = new THREE.AmbientLight(0xcccccc, 1.5)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 2.5, 0, 0)
  camera.add(pointLight)
  scene.add(camera)

  const map = new THREE.TextureLoader().load(
    new URL('./textures/tri_pattern.jpg', import.meta.url).href,
  )
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  map.anisotropy = 16
  map.colorSpace = THREE.SRGBColorSpace

  const material = new THREE.MeshPhongMaterial({ map: map, side: THREE.DoubleSide })

  let object: THREE.Mesh, geometry: ParametricGeometry

  object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10), material)
  object.position.set(-300, 0, 300)
  scene.add(object)

  object = new THREE.Mesh(new THREE.IcosahedronGeometry(75), material)
  object.position.set(-100, 0, 300)
  scene.add(object)

  object = new THREE.Mesh(new THREE.OctahedronGeometry(75), material)
  object.position.set(100, 0, 300)
  scene.add(object)

  object = new THREE.Mesh(new THREE.TetrahedronGeometry(75), material)
  object.position.set(300, 0, 300)
  scene.add(object)

  object = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 4, 4), material)
  object.position.set(-300, 0, 100)
  scene.add(object)

  object = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100, 4, 4, 4), material)
  object.position.set(-100, 0, 100)
  scene.add(object)

  object = new THREE.Mesh(new THREE.CircleGeometry(50, 20, 0, Math.PI * 2), material)
  object.position.set(100, 0, 100)
  scene.add(object)

  object = new THREE.Mesh(new THREE.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2), material)
  object.position.set(300, 0, 100)
  scene.add(object)

  object = new THREE.Mesh(new THREE.CylinderGeometry(25, 75, 100, 40, 5), material)
  object.position.set(-300, 0, -100)
  scene.add(object)

  const points: THREE.Vector2[] = []
  for (let i = 0; i < 50; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2))
  }

  object = new THREE.Mesh(new THREE.LatheGeometry(points, 20), material)
  object.position.set(-100, 0, -100)
  scene.add(object)

  object = new THREE.Mesh(new THREE.TorusGeometry(50, 20, 20, 20), material)
  object.position.set(100, 0, -100)
  scene.add(object)

  object = new THREE.Mesh(new THREE.TorusKnotGeometry(50, 10, 50, 20), material)
  object.position.set(300, 0, -100)
  scene.add(object)

  object = new THREE.Mesh(new THREE.CapsuleGeometry(20, 50), material)
  object.position.set(-300, 0, -300)
  scene.add(object)

  geometry = new ParametricGeometry(plane, 10, 10)
  geometry.scale(100, 100, 100)
  geometry.center()
  object = new THREE.Mesh(geometry, material)
  object.position.set(-100, 0, -300)
  scene.add(object)

  geometry = new ParametricGeometry(klein, 20, 20)
  object = new THREE.Mesh(geometry, material)
  object.position.set(100, 0, -300)
  object.scale.multiplyScalar(5)
  scene.add(object)

  geometry = new ParametricGeometry(mobius, 20, 20)
  object = new THREE.Mesh(geometry, material)
  object.position.set(300, 0, -300)
  object.scale.multiplyScalar(30)
  scene.add(object)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)
  container.appendChild(renderer.domElement)

  stats = new Stats()
  container.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResize)
}

const onWindowResize = () => {
  if (!containerRef.value) return

  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const animate = () => {
  render()
  stats.update()
}

const render = () => {
  const timer = Date.now() * 0.0001

  camera.position.x = Math.cos(timer) * 800
  camera.position.z = Math.sin(timer) * 800
  camera.lookAt(scene.position)

  scene.traverse(function (object) {
    if ((object as THREE.Mesh).isMesh === true) {
      object.rotation.x = timer * 5
      object.rotation.y = timer * 2.5
    }
  })

  renderer.render(scene, camera)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  renderer?.setAnimationLoop(null)
  renderer?.dispose()
})
</script>

<style scoped>
.geometry-container {
  width: 100%;
  height: 100%;
}
</style>
