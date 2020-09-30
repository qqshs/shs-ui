<template>
  <div></div>
</template>

<script>
import { demo } from '@/api/common'
export default {
  data() {
    return {}
  },
  mounted() {
    demo().then((res) => {})
  },
}
</script>

<style>
</style>