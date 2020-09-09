<template>
  <div>
    <a-date-picker @change="onChange" />
  </div>
</template>

<script>
export default {
  methods: {
    onChange(date, dateString) {
      debugger
      console.log(date, dateString)
    },
  },
}
</script>

<style>
</style>